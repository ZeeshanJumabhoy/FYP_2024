import React, { useState } from "react";
import contactUsBg from "/uploads/app/contactus.jpg?url"; // Ensure the correct image path

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Hero Section */}
      <div
  className="w-full h-96 bg-cover bg-center flex items-center justify-center text-white"
  style={{
    backgroundImage: `url(${contactUsBg})`, // Use backticks for template literals
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
        <h1 className="text-4xl text-black font-bold">Contact Us</h1>
      </div>

      {/* Contact Form Section */}
      <div className="w-full md:w-3/4 mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          We'd Love to Hear From You
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12">
          Whether you have a question or need assistance, please reach out!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label htmlFor="message" className="text-gray-700 mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 h-36"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Info Section */}
      <div className="bg-gray-800 text-white py-8 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Our Contact Information</h3>
          <p className="text-lg mb-2">Email: contact@bloodbank.com</p>
          <p className="text-lg mb-2">Phone: +1 (800) 123-4567</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;