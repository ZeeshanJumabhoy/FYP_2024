import React, { useState } from "react";
import { appointmentavailability } from "../Helper/helper";
import toast, { Toaster } from "react-hot-toast";
import "../Styles/timeslot.css";

const Timeslotavailiblity = () => {
  const [schedule, setSchedule] = useState({});
  const [appointmentsPerDay, setAppointmentsPerDay] = useState(8);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const hours = Array.from({ length: 12 }, (_, i) => 9 + i); // 9 AM to 9 PM

  const handleDayToggle = (day) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day] ? null : { start: null, end: null },
    }));
  };

  const handleTimeSelect = (day, blockIndex) => {
    const startHour = hours[blockIndex];

    setSchedule((prev) => {
      const current = prev[day];
      if (!current || current.start === null || current.end !== null) {
        return {
          ...prev,
          [day]: { start: startHour, end: null },
        };
      }

      // Update end hour
      if (startHour >= current.start) {
        return {
          ...prev,
          [day]: { ...current, end: startHour + 1 },
        };
      }

      // Reset if invalid
      return {
        ...prev,
        [day]: { start: startHour, end: null },
      };
    });
  };

  const handleAppointmentsChange = (e) => {
    setAppointmentsPerDay(Number(e.target.value));
  };

  const handleSubmit = async () => {
    const formattedSchedule = Object.keys(schedule)
      .filter((day) => schedule[day] && schedule[day].start !== null && schedule[day].end !== null)
      .map((day) => ({
        day: day,
        timeSlots: [
          {
            startTime: `${schedule[day].start.toString().padStart(2, "0")}:00`,
            endTime: `${schedule[day].end.toString().padStart(2, "0")}:00`,
            maxAppointments: appointmentsPerDay,
            bookedAppointments: 0, // Defaulted to 0
          },
        ],
      }));

    const bloodBankData = {
      bloodBankCode: "BB8", // Example code; replace with actual data if needed
      schedule: formattedSchedule,
    };

    const registerPromise = appointmentavailability(bloodBankData);

    toast.promise(registerPromise, {
      loading: "Submitting schedule...",
      success: () => "Schedule successfully submitted!",
      error: (err) => <b>{err.message || "Failed to submit schedule!"}</b>,
    });
  };

  const renderBlocks = (day) => {
    return hours.map((hour, index) => {
      const isActive =
        schedule[day] &&
        schedule[day].start !== null &&
        schedule[day].end !== null &&
        hour >= schedule[day].start &&
        hour < schedule[day].end;

      return (
        <div
          key={index}
          className={`time-block ${isActive ? "active" : ""}`}
          onClick={() => handleTimeSelect(day, index)}
        >
          {hour}:00
        </div>
      );
    });
  };

  return (
    <div className="container">
      <h1>Blood Bank Appointment Scheduler</h1>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="schedule">
        {days.map((day) => (
          <div key={day} className="day-row">
            <label>
              <input
                type="checkbox"
                checked={!!schedule[day]}
                onChange={() => handleDayToggle(day)}
              />
              {day}
            </label>
            <div className={`time-row ${!schedule[day] ? "disabled" : ""}`}>
              {renderBlocks(day)}
            </div>
          </div>
        ))}
      </div>
      <div className="appointments-per-day">
        <label>
          Number of Appointments per Day:
          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="50"
              value={appointmentsPerDay}
              onChange={handleAppointmentsChange}
            />
            <span className="slider-value">{appointmentsPerDay}</span>
          </div>
        </label>
      </div>
      <button className="submit-btn" onClick={handleSubmit}>
        Submit Schedule
      </button>
    </div>
  );
};

export default Timeslotavailiblity;
