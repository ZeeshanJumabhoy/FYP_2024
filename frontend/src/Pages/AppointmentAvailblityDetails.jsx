import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAppointmentSchedule } from "../Helper/helper";
import "../Styles/button.css"; // Assuming you saved the CSS you provided in a file

const AppointmentAvailabilityDetails = () => {
    const location = useLocation();
    const { bloodBankId } = location.state || {}; // Get bloodBankId from the state

    // Get current day and date
    const currentDate = new Date();
    const currentDay = currentDate.toLocaleDateString("en-US", { weekday: "long" });
    const date = currentDate.toLocaleDateString("en-US");

    // State for storing appointment data, error, and selected day
    const [appointmentData, setAppointmentData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedDay, setSelectedDay] = useState(currentDay); // Initialize with current day

    // Fetch appointment schedule when bloodBankId or selectedDay changes
    useEffect(() => {
        if (bloodBankId && selectedDay) {
            // Clear previous data and error when a new day is selected
            setAppointmentData(null);
            setError(null);

            const fetchData = async () => {
                try {
                    const response = await getAppointmentSchedule({ bloodBankId, day: selectedDay });
                    setAppointmentData(response.data);
                } catch (err) {
                    setError(err.error || "Failed to fetch appointment schedule");
                }
            };

            fetchData();
        }
    }, [bloodBankId, selectedDay]); // Dependency array to re-run when bloodBankId or selectedDay changes

    // Handle day selection from dropdown
    const handleDayChange = (event) => {
        setSelectedDay(event.target.value); // Update selected day
    };

    return (
        <div>
            <div className="bg-blue-50 w-full px-4 py-8" style={{ textAlign: "center" }}>
                {/* Header */}
                <h1 className="text-4xl font-bold text-red-600 mb-4">Book Appointment</h1>
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                    Day & Date: {`${currentDay} ${date}`}
                </h2>
            </div>

            {/* Dropdown and Toggle Button */}
            <div className="flex flex-col items-center justify-center gap-6 mt-6 px-4">
                {/* Dropdown */}
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
                        onChange={handleDayChange} // Handle the change event
                        value={selectedDay} // Set value to selectedDay state
                    >
                        <option value="" disabled>Select Day</option>
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                        <option>Sunday</option>
                    </select>
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
                        data-tg-on="12hr"
                        data-tg-off="24hr"
                        className="tgl-btn"
                    ></label>
                </div>
            </div>

            {/* Appointment Data or Error Message */}
            {error && <div className="text-red-600">{error}</div>}
            {appointmentData && (
                <div>
                    {/* Render your appointment data here */}
                    <pre>{JSON.stringify(appointmentData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default AppointmentAvailabilityDetails;
