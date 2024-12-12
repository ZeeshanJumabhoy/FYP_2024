import React, { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import 'tailwindcss/tailwind.css';
import { FaHeartbeat, FaFileMedical, FaUserShield, FaCheckCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkEligibility } from "../Helper/Validate";
import { useNavigate } from "react-router-dom";

const Questions = () => {
  const [responses, setResponses] = useState({});
  const [showError, setShowError] = useState({});
  const navigate =useNavigate();

  const questions = {
    generalHealth: [
      { question: "How are you feeling today?", options: ["Feeling well", "Not feeling well"], name: "feelingToday" },
      { question: "Have you experienced any of the following in the last 24 hours?", options: ["Fever", "Cough", "Sore throat", "Headache", "Vomiting", "Diarrhea", "None of the above"], name: "recentSymptoms" },
      { question: "Have you had any of the following in the past month?", options: ["Cold or flu", "COVID-19 symptoms", "Recent travel", "None of the above"], name: "pastMonth" },
    ],
    medicalHistory: [
      { question: "Do you currently take any medication or have a medical condition?", options: ["Yes", "No"], name: "medication" },
      { question: "Have you ever been diagnosed with any of the following?", options: ["Hepatitis", "HIV/AIDS", "Malaria", "Blood pressure issues", "Heart disease", "Diabetes", "No"], name: "diagnosed" },
      { question: "Have you had recent surgeries in the past 6 months?", options: ["Yes", "No"], name: "surgeries" },
      { question: "Have you ever had an organ transplant?", options: ["Yes", "No"], name: "transplant" },
    ],
    lifestyleRisk: [
      { question: "Have you received a tattoo in the last 6 months?", options: ["Yes", "No"], name: "tattoo" },
      { question: "In the past 12 months, have you:", options: ["Shared needles", "Unprotected sex", "Partner with STI", "None of the above"], name: "riskFactors" },
      { question: "Have you traveled outside Pakistan in the last 6 months?", options: ["Yes", "No"], name: "travel" },
      { question: "Do you smoke?", options: ["Yes, daily", "Yes, occasionally", "No"], name: "smoke" },
      { question: "How much alcohol do you consume in a week?", options: ["None", "1-2 drinks", "3-4 drinks", "5 or more drinks"], name: "alcohol" },
    ],
    eligibility: [
      { question: "Are you pregnant or have you been pregnant in the last 6 months?", options: ["Yes", "No"], name: "pregnant" },
      { question: "Are you underweight or overweight?", options: ["underweisght", "overweight"], name: "weight" },
      { question: "Have you ever donated blood before?", options: ["Yes", "No"], name: "bloodDonor" },
      { question: "Would you be willing to undergo a medical exam?", options: ["Yes", "No"], name: "medicalExam" },
      { question: "Please confirm all information is accurate.", options: ["Yes, I confirm", "No"], name: "confirmation" },
    ],
  };

  const sectionIcons = {
    generalHealth: <FaHeartbeat className="text-blue-500" />,
    medicalHistory: <FaFileMedical className="text-green-500" />,
    lifestyleRisk: <FaUserShield className="text-yellow-500" />,
    eligibility: <FaCheckCircle className="text-red-500" />,
  };

  const handleResponseChange = (section, name, value) => {
    setResponses(prev => ({ ...prev, [name]: value }));
    setShowError(prev => ({ ...prev, [name]: false }));
  };

  const handleSubmit = () => {
    // Check for unanswered questions first
    const unanswered = Object.keys(questions).reduce((acc, section) => {
      questions[section].forEach(({ name }) => {
        if (!responses[name]) acc[name] = true;
      });
      return acc;
    }, {});

    if (Object.keys(unanswered).length > 0) {
      setShowError(unanswered);
      toast.error("Please answer all questions.", { position: toast.POSITION });
      return;
    }

    // Check eligibility
    const eligibilityResult = checkEligibility({}, responses);
    console.log(responses);

    if (eligibilityResult === true) {

      toast.success("You are now proceeding with the Book Appointment", { position: toast.POSITION});
      navigate('/BookAppointment');
    } else {
      // Display specific ineligibility reason
      const errorMessages = Object.values(eligibilityResult).join(" ");
      toast.error(`Sorry, you are not currently eligible for Blood Donation. ${errorMessages}`, { position: toast.POSITION });
    }
  };


  return (
    <div className="relative min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center"
      style={{ backgroundImage: "url('https://www.metrohospitals.com/wp-content/uploads/2024/01/blood-bank.jpg')" }}>
       <ToastContainer 
        position="top-center" // Sets the default position of toasts to top center
        autoClose={5000}      // Automatically close after 5 seconds
        hideProgressBar       // Hide the progress bar
        newestOnTop           // Show newest toast on top
        closeOnClick          // Close toast on click
        pauseOnHover          // Pause the timer when hovered
      />
      <div className="transparent p-8 rounded-lg shadow-md w-full max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4" style={{ background: "linear-gradient(135deg, #780116, #D13440, #F17A7E)", WebkitBackgroundClip: "text", color: "transparent" }}>
          Blood Donation Appointment
        </h1>
        <p className="text-center mb-8 text-gray-600">
          Please complete this questionnaire to help us ensure a safe donation process.
        </p>

        <VerticalTimeline lineColor="#f87171">
          {Object.entries(questions).map(([section, questionsList], index) => (
            <VerticalTimelineElement
              key={section}
              contentStyle={{ background: '#f9fafb', color: '#333' }}
              contentArrowStyle={{ borderRight: '7px solid  #f9fafb' }}
              iconStyle={{ background: '#f9fafb', color: '#fff' }}
              icon={sectionIcons[section]}
            >
              <div className="flex items-center mb-4">
                {sectionIcons[section]}
                <h3 className="text-lg font-semibold ml-2">{section.replace(/([A-Z])/g, ' $1')}</h3>
              </div>
              {questionsList.map(({ question, options, name }) => (
                <div key={name} className="my-4">
                  <label className="block font-medium">
                    {question}
                    {showError[name] && <span className="text-red-500 ml-2">* Required</span>}
                  </label>
                  <div className="flex flex-col space-y-2">
                    {options.map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={name}
                          value={option}
                          checked={responses[name] === option}
                          onChange={() => handleResponseChange(section, name, option)}
                          className="form-radio text-red-500"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>

        <div className="text-right mt-6">
          <button
            onClick={handleSubmit}
            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
