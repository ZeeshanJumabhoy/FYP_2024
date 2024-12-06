import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAppointmentSchedule } from "../Helper/helper";
import "../Styles/button.css";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import 'font-awesome/css/font-awesome.min.css';

const AppointmentAvailabilityDetails = () => {
    const location = useLocation();
    const { bloodBankId } = location.state || {};

    const currentDate = new Date();
    const currentDay = currentDate.toLocaleDateString("en-US", { weekday: "long" });
    const date = currentDate.toLocaleDateString("en-US");

    const [appointmentData, setAppointmentData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedDay, setSelectedDay] = useState(currentDay);
    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        if (bloodBankId && selectedDay) {
            setAppointmentData(null);
            setError(null);

            const fetchData = async () => {
                try {
                    const response = await getAppointmentSchedule({ bloodBankId, day: selectedDay });
                    console.log(response);
                    const processedData = processAppointmentData(response.data);
                    console.log(processedData);
                    setAppointmentData(processedData);
                } catch (err) {
                    setError(err.error || "Failed to fetch appointment schedule");
                }
            };

            fetchData();
        }
    }, [bloodBankId, selectedDay]);

    const processAppointmentData = (response) => {
        const timeSlots = response.data.timeSlots;
        const slots = [];

        timeSlots.forEach(({ startTime, endTime, maxAppointments, bookedAppointments }) => {
            const startHour = parseInt(startTime.split(":")[0]);
            const endHour = parseInt(endTime.split(":")[0]);

            const totalHours = endHour - startHour;
            const baseAppointments = Math.floor(maxAppointments / totalHours);
            let remainder = maxAppointments % totalHours;

            for (let i = 0; i < totalHours; i++) {
                const blockStart = startHour + i;
                const blockEnd = blockStart + 1;
                const blockAppointments = baseAppointments + (remainder > 0 ? 1 : 0);

                slots.push({
                    time: `${blockStart}-${blockEnd}`,
                    available: blockAppointments,
                    booked: Math.min(blockAppointments, bookedAppointments),
                });

                if (remainder > 0) remainder--;
            }
        });

        return slots;
    };

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const handleSelect = (index) => {
        setSelectedSlot(index);
    };

    const styles = {
        container: {
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
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
                <h1 className="text-4xl font-bold text-red-600 mb-4">Pre Appointment Availability</h1>
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                    Day & Date: {`${currentDay} ${date}`}
                </h2>
            </div>

            <div className="flex flex-col items-center justify-center gap-6 mt-6 px-4">
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
                        <option value="" disabled>
                            Select Day
                        </option>
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

            {/* Toggle Button */}
            <div className="checkbox-wrapper-8 flex sm:ml-4 items-center">
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
                                    <Td>{slot.time}</Td>
                                    <Td>{slot.available}</Td>
                                    <Td>{slot.booked}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>

                </div>
            )}
        </div>
    );
};

export default AppointmentAvailabilityDetails;
