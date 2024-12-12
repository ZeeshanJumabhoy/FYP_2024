import React from "react";

const Footer = () => {
  return (
    <footer className="bg-red-700 text-white py-8">

      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Save Life Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Save Life</h3>
          <ul className="space-y-2">
            <li><a href="register.html" className="text-white">Donate Blood</a></li>
            <li><a href="register.html" className="text-white">Request Blood</a></li>
            <li><a href="find_bloodbank.html" className="text-white">Find Blood Bank</a></li>
            <li><a href="find_hospital.html" className="text-white">Find Hospital</a></li>
            <li><a href="find_camp.html" className="text-white">Find Blood Camp</a></li>
            <li><a href="find_lab.html" className="text-white">Find Labs</a></li>
          </ul>
        </div>

        {/* Register Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Register</h3>
          <ul className="space-y-2">
            <li><a href="signin.html" className="text-white">Donor Signup</a></li>
            <li><a href="add_bloodbank.html" className="text-white">Blood Bank Sign Up</a></li>
            <li><a href="add_hospital.html" className="text-white">Hospital Sign Up</a></li>
            <li><a href="add_lab.html" className="text-white">Lab Sign Up</a></li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Company</h3>
          <ul className="space-y-2">
            <li><a href="about.html" className="text-white">About Us</a></li>
            <li><a href="contact.html" className="text-white">Contact Us</a></li>
            <li><a href="privacy-policy.html" className="text-white">Privacy Policy</a></li>
            <li><a href="#" className="text-white">Terms of Service</a></li>
          </ul>
        </div>

        {/* Download App Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Download App</h3>
          <a
            href="https://play.google.com/store/apps/details?id=com.bloodlinkapp.in"
            target="_main"
            rel="noopener noreferrer"
          >
            <img src="uploads/app/googly.png" alt="Google Play" className="w-32" />
          </a>
        </div>
      </div>
      <div className="bottom-footer-1">
        <p>Copyright 2024 FAST FYP</p>
      </div>
    </footer>
    
  );
};

export default Footer;
