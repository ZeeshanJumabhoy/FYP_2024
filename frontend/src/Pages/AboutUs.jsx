import React from "react";
import aboutus from "/uploads/app/contactus.jpg?url"
import logo from "/uploads/app/contactus.jpg?url"

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-r from-red-800 via-black to-black text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="relative mb-16">
          <img
            src={aboutus} // Hero image related to blood donation
            alt="Blood Donation Hero"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
            {/* <div>
              <h1 className="text-5xl font-extrabold">Saving Lives, One Drop at a Time</h1>
              <p className="mt-4 text-xl">Join us in our mission to make blood donation easier, faster, and safer for all.</p>
            </div> */}
          </div>
        </section>

        {/* About Us Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-red-700">About Us</h1>
          <p className="text-xl text-gray-300 mt-4">
            Your partner in saving lives through blood donation.
          </p>
        </div>

        {/* Who We Are Section */}
        <section className="bg-white shadow-lg rounded-lg p-8 mb-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <img
                src={logo} // Add an image relevant to the blood donation theme
                alt="Blood Donation"
                className="w-48 h-48 object-cover rounded-full shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-red-600">Who We Are</h2>
              <p className="mt-4 text-lg text-gray-700">
                Welcome to <strong>Blood Safe Life</strong>, where we are dedicated to revolutionizing the blood donation and transfusion process. We are passionate about making blood donations easier, faster, and safer, ensuring that anyone in need of blood can access it quickly.
              </p>
            </div>
          </div>
        </section>

        {/* Mission and Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-red-600 text-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-lg">
              Our mission is to provide a seamless and reliable blood donation platform that ensures life-saving assistance is available to everyone in need, wherever and whenever required.
            </p>
          </div>
          <div className="bg-red-500 text-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-lg">
              Our vision is to be the leading blood donation platform that connects donors and recipients instantly, eliminating shortages and making blood transfusions available on demand.
            </p>
          </div>
        </div>

        {/* Flagship Features Section */}
        <section className="bg-white text-black p-8 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8 text-red-600">
            Our Flagship Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-700 text-white rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-tint text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold mb-2">Easy Blood Requests</h4>
              <p className="text-center text-gray-700">
                Quickly request blood and find the nearest donation points in emergencies.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-700 text-white rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-gift text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold mb-2">Reward Programs</h4>
              <p className="text-center text-gray-700">
                Donors earn loyalty points that can be redeemed for healthcare services.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-700 text-white rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-bell text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold mb-2">Personalized Alerts</h4>
              <p className="text-center text-gray-700">
                Receive reminders for upcoming donation drives and eligibility.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-red-50 p-8 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8 text-red-600">
            Why Choose Us?
          </h2>
          <ul className="space-y-4 text-lg text-gray-700">
            <li>Reliable and Transparent Processes</li>
            <li>24/7 Availability and Support</li>
            <li>Secure and Safe Blood Donation Process</li>
            <li>Innovative Technology for Fast Blood Matching</li>
            <li>Community-Oriented and Supportive Environment</li>
          </ul>
        </section>

        {/* Join Us Section */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-red-600">Join Us Today!</h2>
          <p className="text-lg text-white-700 mb-4">
            Whether you're donating blood, seeking blood, or supporting our cause, your participation makes a difference. Join us in making the world a safer place, one donation at a time.
          </p>
          <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700">
            Get Started
          </button>
        </section>

        {/* Contact Us Section */}
        <section className="bg-white text-black p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-8 text-red-600">
            Contact Us
          </h2>
          <p className="text-lg text-center mb-4">Have questions or want to connect with us? Reach out to our team below:</p>
          <div className="text-center space-y-4">
            <p><strong>Email:</strong> contact@yourorganization.com</p>
            <p><strong>Phone:</strong> (123) 456-7890</p>
            <p><strong>Address:</strong> 123 Blood Donation Ave, City, State, 12345</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
