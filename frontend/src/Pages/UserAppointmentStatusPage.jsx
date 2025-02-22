import React, { useState, useEffect } from "react";
import { getappointmentdetails } from "../Helper/helper";
import useFetch from "../hooks/fetch";
import "../Styles/button.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle } from "react-icons/fa";

const UserAppointmentStatusPage = () => {
    const [{ isLoading, apiData }] = useFetch();
    const { email } = apiData || {};
    const [error, setError] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState(null);

    useEffect(() => {
        if (email) {
            fetchData();
        }
    }, [email]);

    const fetchData = async () => {
        try {
            const response = await getappointmentdetails(email);
            console.log(response);
            if (response.data && response.data.appointments) {
                const appointments = response.data.appointments;

                // Transform the fetched data into the structure you want
                const transformedData = transformAppointmentData(appointments);
                setAppointmentDetails(transformedData);
            } else {
                toast.error("No appointments found");
                setError("No appointments found");
            }
        } catch (err) {
            setError(err.error || "Failed to fetch appointment schedule");
            toast.error(err.error || "Failed to fetch appointment schedule");
        }
    };

    const transformAppointmentData = (appointments) => {
        const currentAppointment = appointments.find((appt) => appt.status === null);
        const previousAppointments = appointments.filter((appt) => appt.status !== null);

        return {
            user: {
                name: appointments[0].firstName,
                email: appointments[0].email,
            },
            currentAppointment: currentAppointment
                ? {
                    bloodbank: currentAppointment.bloodBankName,
                    date: currentAppointment.date,
                    time: currentAppointment.timeslot,
                    status: "Pending",
                }
                : null,
            previousAppointments: previousAppointments.map((appt) => ({
                bloodbank: appt.bloodBankName,
                date: appt.date,
                time: appt.timeslot,
                status: appt.status === null ? "Pending" : appt.status,
            })),
        };
    };

    const renderStatus = (status) => {
        switch (status) {
            case "Appear":
                return (
                    <div className="flex items-center text-green-600">
                        <FaCheckCircle size={20} className="mr-2" />
                        <span className="font-semibold">Approved</span>
                    </div>
                );
            case "Not-Appear":
                return (
                    <div className="flex items-center text-red-600">
                        <FaTimesCircle size={20} className="mr-2" />
                        <span className="font-semibold">Rejected</span>
                    </div>
                );
            case "Pending":
                return (
                    <div className="flex items-center text-yellow-500">
                        <FaExclamationCircle size={20} className="mr-2" />
                        <span className="font-semibold">Pending</span>
                    </div>
                );
            default:
                return null;
        }
    };

    if (!appointmentDetails) {
        return <div>Loading or no appointment data available...</div>;
    }

    return (
        <div className="bg-gray-50 flex flex-col items-center min-h-screen overflow-hidden">
            {/* Header Section */}
            <header className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-6">
                <div className="container mx-auto text-center px-4">
                    <h1 className="text-3xl font-bold">Your Appointment Status</h1>
                    <p className="text-lg mt-2 text-white">Thank you for donating blood!</p>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6 flex-grow">
                <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
                    {/* User Info */}
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            {appointmentDetails.user.name}
                        </h2>
                        <p className="text-gray-600 mt-1">{appointmentDetails.user.email}</p>
                    </div>

                    {/* Current Appointment Details */}
                    {appointmentDetails.currentAppointment ? (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800">Current Appointment</h3>
                            <div className="flex justify-between text-gray-600">
                                <span className="font-medium">Blood Bank:</span>
                                <span>{appointmentDetails.currentAppointment.bloodbank}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span className="font-medium">Date:</span>
                                <span>{appointmentDetails.currentAppointment.date}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span className="font-medium">Time:</span>
                                <span>{appointmentDetails.currentAppointment.time}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800">Current Appointment</h3>
                            <p className="text-gray-600 italic">No current appointment available.</p>
                        </div>
                    )}

                    {/* Current Appointment Status */}
                    {appointmentDetails.currentAppointment && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800">Status</h3>
                            <div className="border p-4 rounded-lg">
                                {renderStatus(appointmentDetails.currentAppointment.status)}
                            </div>
                        </div>
                    )}

                    {/* Previous Appointments */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800">Previous Appointments</h3>
                        {appointmentDetails.previousAppointments.map((appointment, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span className="font-medium">Blood Bank:</span>
                                    <span>{appointment.bloodbank}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span className="font-medium">Date:</span>
                                    <span>{appointment.date}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span className="font-medium">Time:</span>
                                    <span>{appointment.time}</span>
                                </div>
                                {/* Status of Previous Appointment */}
                                <div className="mt-2">{renderStatus(appointment.status)}</div>
                            </div>
                        ))}
                    </div>

                    {/* Motivational Quote */}
                    <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-6 rounded-lg">
                        <h4 className="text-xl font-semibold mb-4">Why Donate Blood?</h4>
                        <blockquote className="italic text-lg">
                            "One donation can save up to three lives. Be the reason someone smiles
                            today."
                        </blockquote>
                    </div>

                    {/* CTA to check back */}
                    <div className="text-center">
                        <button className="bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition duration-300">
                            Check Back Later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAppointmentStatusPage;
