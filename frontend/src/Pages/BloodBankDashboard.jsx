import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const BloodBankDashboard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling on background
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Header */}
      <header className="bg-red-700 text-white p-2 text-center text-sm fixed top-0 left-0 w-full z-30">
        Join <span className="font-bold">LifeSave</span> Blood Bank today to save lives and make a difference!
      </header>

      {/* Layout */}
      <div className="flex flex-col md:flex-row pt-12 h-screen"> {/* Adjusted for header height */}
        {/* Sidebar */}
        <aside
          className={`bg-white p-4 w-full md:w-1/6 transform md:transform-none md:translate-x-0 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
            } fixed md:relative h-94 z-20 overflow-y-auto`}
        >
          {/* Close Menu Button for Mobile */}
          <button
            className="absolute top-4 right-4 md:hidden text-gray-700"
            onClick={toggleMenu}
          >
            ✕
          </button>

          <div className="flex items-center mb-4">
            <i className="fas fa-tint text-2xl"></i>
            <span className="ml-2 text-2xl font-bold">LifeSave</span>
          </div>
          <nav className="space-y-4">
            <Link to="/AppointmentRequestManage">
              <MenuItem icon="fa-history" text="Blood Request Manage" />
            </Link>

            <Link to="AddCampaign">
              <MenuItem icon="fa-hospital" text="Add Campaign" />
            </Link>

            <Link to="ManageCampaign">
              <MenuItem icon="fa-calendar-alt" text="Manage Campaign" />
            </Link>

            <Link to="Timeslotavailiblity">
              <MenuItem icon="fa-hand-holding-heart" text="Appointment Scheduling" />
            </Link>

            <Link to="BloodInventoryManage">
              <MenuItem icon="fa-info-circle" text="Blood Inventory Manage" />
            </Link>
            <MenuItem icon="fa-sign-out" text="Logout" />
          </nav>
        </aside>

        {/* Hamburger Menu Button */}
        <button
          className="fixed top-4 left-2 md:hidden z-30 bg-red-700 text-white p-2 rounded"
          onClick={toggleMenu}
        >
          ☰
        </button>

        {/* Main Content */}
        <main className="w-full md:w-5/6 bg-gray-100 p-4 overflow-y-auto flex-1">
          {/* Content here */}
          <h1 className="text-2xl font-bold mb-4">Welcome to LifeSave Blood Bank</h1>

          {/* Mission Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
            <p className="text-gray-700">
              LifeSave Blood Bank is dedicated to saving lives by connecting donors and recipients. Join us in our mission to ensure
              everyone has access to safe and reliable blood donations.
            </p>
          </section>

          {/* Benefits Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Why Donate Blood?</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Save up to 3 lives with every donation.</li>
              <li>Improve your own health through routine blood donation.</li>
              <li>Support hospitals and patients in need of blood transfusions.</li>
            </ul>
          </section>

          {/* Services Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white shadow p-4 rounded">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Donate Blood"
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-2 text-lg font-medium">Donate Blood</h3>
                <p className="text-sm text-gray-600">
                  Register to donate blood and save lives in your community.
                </p>
              </div>
              <div className="bg-white shadow p-4 rounded">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Find Donors"
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-2 text-lg font-medium">Find Donors</h3>
                <p className="text-sm text-gray-600">
                  Search for nearby donors during emergencies.
                </p>
              </div>
              <div className="bg-white shadow p-4 rounded">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Schedule Donation"
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-2 text-lg font-medium">Schedule Donation</h3>
                <p className="text-sm text-gray-600">
                  Book an appointment at a nearby blood bank center.
                </p>
              </div>
            </div>
          </section>

          {/* Added More Content to Enable Scrolling */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
            <p className="text-gray-700">
              Blood donations are a critical resource for saving lives in medical emergencies, surgeries, and for patients
              undergoing treatment. By donating blood, you help ensure that the healthcare system has enough supply to meet
              the growing demand. Your generous contribution can make a difference in countless lives.
            </p>
            <p className="text-gray-700 mt-4">
              Donating blood is safe, simple, and quick. It only takes a small amount of your time and can make a huge impact.
              Consider donating today to be a hero in someone's life!
            </p>
          </section>

          {/* More Content for Scroll */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">How Blood Donation Works</h2>
            <p className="text-gray-700">
              The process of donating blood is easy and safe. Here's what you can expect:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2 mt-4">
              <li>Registration: You will be asked for some personal information and medical history.</li>
              <li>Screening: A quick health checkup to ensure you are fit to donate.</li>
              <li>Donation: The actual donation takes about 10-15 minutes.</li>
              <li>Recovery: After donating, you will be given a snack and drink to help replenish your energy.</li>
            </ol>
            <p className="text-gray-700 mt-4">
              Your blood donation will be tested, processed, and distributed to patients in need. It is a safe, easy, and impactful way
              to help others.
            </p>
          </section>

          {/* More Content for Scroll */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Important Facts About Blood Donation</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>One blood donation can save up to 3 lives.</li>
              <li>Donating blood is safe and takes only a few minutes.</li>
              <li>Blood donations are needed every day for surgeries, emergencies, and treatments.</li>
              <li>People can donate blood every 56 days, so it's possible to give blood multiple times a year.</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, text }) => (
  <a
    href="#"
    className="flex items-center text-gray-700 hover:text-red-700 hover:bg-red-100 p-2 rounded transition duration-200"
  >
    <i className={`fas ${icon} text-xl`}></i> {/* Correctly using template literals */}
    <span className="ml-2">{text}</span>
  </a>
);

export default BloodBankDashboard;