import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAppointmentSchedule, bookappointment } from "../Helper/helper";
import { toast } from "react-toastify";
import useFetch from '../hooks/fetch';
import "../Styles/button.css";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import 'font-awesome/css/font-awesome.min.css';
import { ToastContainer } from "react-toastify";

const AppointmentAvailabilityDetails = () => {
    const [{ isLoading, apiData }] = useFetch();
    const { firstName, phoneNumber, email } = apiData || {};
    const location = useLocation();
    const { bloodBankId, bloodBankName } = location.state || {};

    const currentDate = new Date();
    const currentDay = currentDate.toLocaleDateString("en-US", { weekday: "long" });
    const date = currentDate.toLocaleDateString("en-US");

    const [appointmentData, setAppointmentData] = useState(null);
    const [error, setError] = useState(null);
    const [displayDate, setDisplayDate] = useState(date);
    const [selectedDay, setSelectedDay] = useState(currentDay);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false); // Tooltip visibility state

    // Fetch appointment data on blood bank or day change
    useEffect(() => {
        if (bloodBankId && selectedDay) {
            setAppointmentData(null);
            setError(null);

            const fetchData = async () => {
                try {
                    const response = await getAppointmentSchedule({ bloodBankId, day: selectedDay });
                    setAppointmentData(response.data.data.timeSlots); // Use the backend's processed data directly
                } catch (err) {
                    setError(
                        <p style={{ color: "black", textAlign: "center", fontWeight: "bold", marginTop: "50px", fontSize: "24px", marginBottom: "50px" }}>
                            {err.error || "Failed to fetch appointment schedule"}
                        </p>
                    );
                }
            };

            fetchData();
        }
    }, [bloodBankId, selectedDay]);

    // Handle day selection
    const handleDayChange = (event) => {
        const dayName = event.target.value;
        setSelectedDay(dayName);

        // Calculate next week's date for the selected day
        const nextDate = getNextWeekDate(dayName);
        setDisplayDate(nextDate.toLocaleDateString("en-US"));
    };

    // Get next week's date for a given day
    const getNextWeekDate = (dayName) => {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const selectedDayIndex = daysOfWeek.indexOf(dayName);
        const currentDayIndex = currentDate.getDay();

        const daysUntilNext = (selectedDayIndex - currentDayIndex + 7) % 7 || 7; // Ensure it's next week
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + daysUntilNext);

        return nextDate;
    };

    // Handle time slot selection
    const handleSelect = (index) => {
        setSelectedSlot(index);
        setShowTooltip(false); // Hide tooltip on valid selection
    };

    // Submit appointment
    const handleSubmit = async () => {
        if (selectedSlot === null) {
            setShowTooltip(true); // Show tooltip if no selection
        } else {
            const appointmentDetails = {
                firstName,
                email,
                phoneNumber,
                bloodBankName,
                bloodBankId,
                timeslot: appointmentData[selectedSlot]?.startTime + "-" + appointmentData[selectedSlot]?.endTime,
                date: displayDate,
                day: selectedDay
            };
            try {
                const response = await bookappointment(appointmentDetails);
                if (response.status === 201) {
                    toast.success("Appointment booked successfully!");
                } else {
                    toast.error("An error occurred. Please try again.");
                }
            } catch (error) {
                toast.error(error.message || "An error occurred. Please try again.");
            }
        }
    };

    const styles = {
        container: {
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
        },
        tooltip: {
            color: "red",
            fontSize: "0.9rem",
            marginTop: "4px",
        },
        heading: {
            fontSize: '1.5rem',
            marginBottom: '10px',
        },
        paragraph: {
            marginBottom: '20px',
        },
        icon: {
            width: '60px',  // Icon width
            height: '60px', // Icon height
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, color 0.3s ease',
            margin: '0 auto',  // Ensure it's centered in desktop view
        },
        selectedIcon: {
            backgroundColor: '#f8d7da',
            color: 'red',
        },
        defaultIcon: {
            fontSize: '2rem',  // Larger icon size
            color: 'green',
        },
        paginationButtons: {
            marginTop: '20px',
        },
        button: {
            backgroundColor: '#007bff',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            margin: '5px',
            cursor: 'pointer',
            borderRadius: '5px',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
        td: {
            textAlign: 'center',  // Center data content
            padding: '10px 15px',
            borderBottom: '1px solid #ddd',
        },
        // Media query for smaller screen sizes
        '@media (max-width: 600px)': {
            icon: {
                width: '50px',  // Adjust width for mobile view
                height: '50px', // Adjust height for mobile view
                fontSize: '1.5rem',  // Adjust icon font size for mobile view
            },
        },
    };

    return (
        <div>
            <div className="bg-blue-50 w-full px-4 py-8" style={{ textAlign: "center" }}>
                <ToastContainer position="top-center" reverseOrder={false} />
                <h1 className="text-4xl font-bold text-red-600 mb-4">Pre Appointment Availability</h1>
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                    Day & Date: {`${selectedDay} ${displayDate}`}
                </h2>
                <h3 className="text-2xl font-bold text-green-600 mb-4">{bloodBankName}</h3>
            </div>

            {/* Day Selection */}
            <div className="flex flex-col items-center justify-center gap-6 mt-6 px-4"  style={{ paddingBottom: "10 px" }}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full max-w-xs">
                    <label
                        htmlFor="daySelect"
                        className="block text-lg font-medium mb-2 sm:mb-0 sm:text-base text-center sm:text-left"
                    >
                        Select Day
                    </label>
                    <select
                        id="daySelect"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base sm:w-auto w-full"
                        onChange={handleDayChange}
                        value={selectedDay}
                    >
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                        <option>Sunday</option>
                    </select>
                </div>
            </div>

            <div className="checkbox-wrapper-8 flex sm:ml-4 items-center" style={{ marginLeft: "7rem" }}>
                <input
                    type="checkbox"
                    id="cb3-8"
                    className="tgl tgl-skewed"
                />
                <label
                    htmlFor="cb3-8"
                    data-tg-on="24hr"
                    data-tg-off="12hr"
                    className="tgl-btn"
                ></label>
            </div>

            {error && <div className="text-red-600">{error}</div>}

            {/* Time Slot Table */}
            {appointmentData && (
                <div className="mt-8 px-8">
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Select</Th>
                                <Th>Time Slot</Th>
                                <Th>Available Appointments</Th>
                                <Th>Booked Appointments</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {appointmentData.map((slot, index) => (
                                <Tr key={index}>
                                    <Td>
                                        <div
                                            style={{
                                                ...styles.icon,
                                                ...(selectedSlot === index ? styles.selectedIcon : {}),
                                            }}
                                            onClick={() => handleSelect(index)}
                                        >
                                            <i
                                                className="fa fa-clock-o"
                                                style={styles.defaultIcon}
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                    </Td>
                                    <Td>{`${slot.startTime}-${slot.endTime}`}</Td>
                                    <Td>{slot.maxAppointments}</Td>
                                    <Td>{slot.bookedAppointments}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>

                    <button
                        onClick={handleSubmit}
                        disabled={selectedSlot === null}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded mt-6"
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AppointmentAvailabilityDetails;
