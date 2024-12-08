import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getAppointmentDetailsByBloodBank, updateAppointmentStatus } from "../Helper/helper";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

function AppointmentRequestsManage() {
    const [requests, setRequests] = useState([]);
    const bloodBankId = "BB8"; // Replace with the actual blood bank ID

    // Fetch appointment details on component mount
    useEffect(() => {
        async function fetchAppointments() {
            try {
                const data = await getAppointmentDetailsByBloodBank(bloodBankId);
                console.log("Fetched Appointments:", data);
                setRequests(data.appointments || []); // Set the fetched data
            } catch (error) {
                console.error("Error fetching appointments:", error);
                toast.error("Failed to fetch appointments!");
            }
        }
        fetchAppointments();
    }, [bloodBankId]);

    const handleAction = async (id, action) => {
        // Get the email of the selected appointment
        const selectedRequest = requests.find((request) => request.id === id);

        if (!selectedRequest) {
            toast.error("Request not found!");
            return;
        }

        try {
            const updatedData = await updateAppointmentStatus(selectedRequest.email, action);
            console.log("Updated Appointment Data:", updatedData);

            // Update the status in the local state
            const updatedRequests = requests.map((request) =>
                request.id === id ? { ...request, status: action } : request
            );
            setRequests(updatedRequests);

            toast.success(`Appointment marked as ${action.toLowerCase()}!`);
        } catch (error) {
            console.error("Error updating appointment status:", error);
            toast.error("Failed to update appointment status!");
        }
    };

    return (
        <div className="w-full bg-white-100">
            <Toaster />
            <header className="bg-red-600 text-white py-4">
                <h1 className="text-center text-2xl font-bold">Manage Appointment Requests</h1>
            </header>

            <div className="px-4 py-8">
                <Table className="w-full table-auto">
                    <Thead>
                        <Tr className="bg-red-600 text-white text-sm">
                            <Th className="py-3 px-2 text-left">Donor</Th>
                            <Th className="py-3 px-2 text-left">Phone</Th>
                            <Th className="py-3 px-2 text-left">Email</Th>
                            <Th className="py-3 px-2 text-left">Day</Th>
                            <Th className="py-3 px-2 text-left">Time</Th>
                            <Th className="py-3 px-2 text-left">Date</Th>
                            <Th className="py-3 px-2 text-center">Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {requests.map((request, index) => (
                            <Tr
                                key={request.id}
                                className={`${index % 2 === 0 ? "bg-red-50" : "bg-white"
                                    } hover:bg-red-100 text-sm`}
                            >
                                <Td className="py-2 px-2">{request.firstName}</Td>
                                <Td className="py-2 px-2">{request.phoneNumber}</Td>
                                <Td className="py-2 px-2">{request.email}</Td>
                                <Td className="py-2 px-2">{request.day}</Td>
                                <Td className="py-2 px-2">{request.timeslot}</Td>
                                <Td className="py-2 px-2">{request.date}</Td>
                                <Td className="py-2 px-2 text-center">
                                    <button
                                        onClick={() => handleAction(request.id, 'Approved')}
                                        className="mr-2 text-green-600 hover:text-green-800 focus:outline-none"
                                        style={{ fontSize: '20px', padding: '5px 10px' }}
                                        title="Approve">
                                        ✅
                                    </button>
                                    <button
                                        onClick={() => handleAction(request.id, 'Rejected')}
                                        className="text-red-600 hover:text-red-800 focus:outline-none"
                                        style={{ fontSize: '20px', padding: '5px 10px' }}
                                        title="Reject">
                                        ❌
                                    </button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </div>
        </div>
    );
}

export default AppointmentRequestsManage;
