import React, { useState } from 'react';

const FAQSection = () => {
  const faqData = [
    {
      question: 'Am I eligible to donate blood?',
      answer: 'You are eligible if you are healthy, weigh at least 50kg, and are between 17-65 years old.',
    },
    {
      question: 'What should I do after donating blood?',
      answer: 'Drink plenty of fluids, avoid strenuous activity, and eat a healthy meal afterward.',
    },
    {
      question: 'How can I use the app to offer blood donation?',
      answer: 'Log in, navigate to the "Donate" section, and follow the instructions to offer a donation.',
    },
    {
      question: 'Can I make a request for a donation while traveling outside my city of residence?',
      answer: 'Yes, you can request blood donation from anywhere using the app.',
    },
    {
      question: 'Can I make a request for a specific rare blood group?',
      answer: 'Yes, you can filter by specific blood groups when submitting a request.',
    },
  ];

  const bloodTypeCompatibility = [
    { recipient: 'AB+', donors: ['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-'] },
    { recipient: 'AB-', donors: ['AB-', 'A-', 'B-', 'O-'] },
    { recipient: 'A+', donors: ['A+', 'A-', 'O+', 'O-'] },
    { recipient: 'A-', donors: ['A-', 'O-'] },
    { recipient: 'B+', donors: ['B+', 'B-', 'O+', 'O-'] },
    { recipient: 'B-', donors: ['B-', 'O-'] },
    { recipient: 'O+', donors: ['O+', 'O-'] },
    { recipient: 'O-', donors: ['O-'] },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-red-300 text-black min-h-screen p-6 flex flex-col lg:flex-row gap-6">
      {/* FAQ Section */}
      <div className="lg:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <ul className="space-y-3">
          {faqData.map((faq, index) => (
            <li
              key={index}
              className="border border-gray-700 rounded-lg p-3 hover:bg-gray-400 transition-colors"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAnswer(index)}
              >
                <span className="text-base font-medium">{faq.question}</span>
                <span className="text-lg">{activeIndex === index ? '-' : '+'}</span>
              </div>
              {activeIndex === index && (
                <p className="mt-2 text-gray-500 text-sm">{faq.answer}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Blood Type Compatibility Chart */}
      <div className="lg:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Blood Type Compatibility</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 text-sm">
            <thead className="bg-gray-500">
              <tr>
                <th className="border border-gray-600 px-3 py-2 text-left">Recipient</th>
                <th className="border border-gray-600 px-3 py-2 text-left">Donor</th>
              </tr>
            </thead>
            <tbody>
              {bloodTypeCompatibility.map((row, index) => (
                <tr key={index} className="hover:bg-gray-400 transition-colors">
                  <td className="border border-gray-600 px-3 py-2">{row.recipient}</td>
                  <td className="border border-gray-600 px-3 py-2">
                    {row.donors.map((donor, i) => (
                      <span
                        key={i}
                        className="inline-block bg-red-500 text-white rounded-full px-2 py-1 text-xs mr-1 mb-1"
                      >
                        {donor}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
