import React from 'react';
import bloodDonationBg from '/uploads/app/blood.jpg?url'; // Update with your actual image path
import { FaRegCheckCircle, FaRegQuestionCircle, FaHeartbeat } from 'react-icons/fa';

const EducationalPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Hero Section */}
      <div
        className="w-full h-96 bg-cover bg-center text-center flex items-center justify-center relative"
        style={{ backgroundImage: `url(${bloodDonationBg})`, backgroundSize: 'cover' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white p-4">
          <h1 className="text-4xl font-bold tracking-wide mb-4">Make a Lifesaving Difference</h1>
          <p className="text-xl">Donate Blood, Save Lives. Learn More About the Importance of Blood Donation.</p>
        </div>
      </div>

      {/* About Blood Donation Section */}
      <div className="py-16 px-6 md:px-16 bg-white">
        <h2 className="text-3xl font-semibold text-center text-red-600 mb-8">
          Why Blood Donation Matters
        </h2>
        <div className="max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed">
          <p>
            Blood donation is one of the most selfless acts that can save lives. Each donation can help up to
            three patients in need. Whether it’s for surgeries, trauma care, cancer treatments, or chronic conditions,
            blood is essential. Your donation can make a difference in someone’s life.
          </p>
        </div>
      </div>

      {/* Blood Donation Process Section */}
      <div className="py-16 px-6 md:px-16 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center text-red-600 mb-8">
          How Blood Donation Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <FaHeartbeat className="text-4xl text-red-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Registration</h3>
            <p>
              When you arrive at the donation center, you will register and provide your health details.
              This helps ensure you are eligible to donate.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <FaRegCheckCircle className="text-4xl text-red-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Screening</h3>
            <p>
              A health professional will take your vital signs and hemoglobin levels to ensure you're fit to donate.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <FaRegQuestionCircle className="text-4xl text-red-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 3: Donation</h3>
            <p>
              You will donate blood via a needle in a safe, sterile environment. The donation takes around 10 minutes.
            </p>
          </div>
        </div>
      </div>

      {/* Eligibility Section */}
      <div className="py-16 px-6 md:px-16 bg-white">
        <h2 className="text-3xl font-semibold text-center text-red-600 mb-8">
          Who Can Donate Blood?
        </h2>
        <div className="max-w-3xl mx-auto text-lg text-gray-600 space-y-4">
          <p>Eligibility criteria for donating blood include the following:</p>
          <ul className="list-disc pl-6">
            <li>You must be at least 18 years old (16 or 17 with parental consent).</li>
            <li>You should weigh at least 110 pounds (50 kg).</li>
            <li>You should be in general good health and feeling well on the day of donation.</li>
            <li>You should not have donated blood in the past 56 days (8 weeks).</li>
            <li>You should not have a history of certain health conditions such as heart disease, HIV, or Hepatitis.</li>
          </ul>
        </div>
      </div>

      {/* Safety Information Section */}
      <div className="py-16 px-6 md:px-16 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center text-red-600 mb-8">
          Blood Donation is Safe
        </h2>
        <div className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
          <p>
            Blood donation is a safe and well-monitored process. All equipment used in the donation process is sterile
            and disposable, ensuring that the process is hygienic and risk-free.
          </p>
          <p>
            You may experience a mild bruise or temporary discomfort at the needle site, but this is normal and resolves quickly.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-6 md:px-16 bg-white">
        <h2 className="text-3xl font-semibold text-center text-red-600 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto text-lg text-gray-600 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-800">How Often Can I Donate Blood?</h3>
            <p>You can donate whole blood every 56 days (8 weeks). Plasma and platelet donations can be made more frequently.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Can I Donate Blood if I Have a Health Condition?</h3>
            <p>If you have a medical condition, consult with a doctor or the blood donation center to check if you're eligible.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Does Blood Donation Hurt?</h3>
            <p>The needle insertion might cause mild discomfort, but it is quick. Most donors report feeling fine after the donation.</p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-red-600 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Help Save Lives Today</h2>
        <p className="text-lg mb-6">Your donation makes a difference in the lives of others. Join us and be a lifesaver!</p>
        <button className="bg-white text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
          Donate Now
        </button>
      </div>

    </div>
  );
};

export default EducationalPage;