import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useFetch from "../hooks/fetch";
import "../Styles/tailwind.css";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export default function RequestBlood() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("all");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all pending blood requests by default
  const [{ apiData: allRequests, isLoading: allLoading, error: allError }] =
    useFetch("getAllPendingBloodRequests");

  // Fetch user's specific blood requests
  const userEmail = "mustafazeeshan333@gmail.com"; // Replace with dynamic email
  const [{ apiData: userRequests, isLoading: userLoading, error: userError }] =
    useFetch(`getbloodrequestinfo/${userEmail}`);

  // Fetch data based on active button type
  const fetchData = (buttonType) => {
    setIsLoading(true);
    setError(null);

    if (buttonType === "all") {
      if (allError) {
        setError("Failed to load all blood requests");
        toast.error("Failed to load all blood requests");
      } else if (allRequests) {
        setData(allRequests.requests || []);
      }
    } else {
      if (userError) {
        setError("Failed to load your blood requests");
        toast.error("Failed to load your blood requests");
      } else if (userRequests) {
        setData(userRequests.requests || []);
      }
    }

    setIsLoading(false);
  };

  // Load data on button change
  useEffect(() => {
    fetchData(activeButton);
  }, [activeButton, allRequests, userRequests]);

  // Render table based on active button
  const renderTable = () => {
    if (activeButton === "all") {
      return (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2">Blood Group</th>
              <th className="px-4 py-2">Units</th>
              <th className="px-4 py-2">Urgency</th>
              <th className="px-4 py-2">Medical Reason</th>
              <th className="px-4 py-2">Antibodies</th>
              <th className="px-4 py-2">Hospital</th>
              <th className="px-4 py-2">Transfusion Date</th>
              <th className="px-4 py-2">Special Requirements</th>
            </tr>
          </thead>
          <tbody>
            {data.map((request, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{request.bloodGroup}</td>
                <td className="border px-4 py-2">{request.units}</td>
                <td className="border px-4 py-2">{request.urgency}</td>
                <td className="border px-4 py-2">{request.medicalReason}</td>
                <td className="border px-4 py-2">{request.antibodies}</td>
                <td className="border px-4 py-2">
                  {request.hospitalName} - {request.department}
                </td>
                <td className="border px-4 py-2">
                  {new Date(request.transfusionDateTime).toLocaleString()}
                </td>
                <td className="border px-4 py-2">
                  {request.specialRequirements.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2">Patient Name</th>
              <th className="px-4 py-2">Blood Group</th>
              <th className="px-4 py-2">Units</th>
              <th className="px-4 py-2">Weight</th>
              <th className="px-4 py-2">Urgency</th>
              <th className="px-4 py-2">Blood Component</th>
              <th className="px-4 py-2">Hospital</th>
              <th className="px-4 py-2">Transfusion Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Special Requirements</th>
            </tr>
          </thead>
          <tbody>
            {data.map((request, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{request.patientName}</td>
                <td className="border px-4 py-2">{request.bloodGroup}</td>
                <td className="border px-4 py-2">{request.units}</td>
                <td className="border px-4 py-2">{request.weight}</td>
                <td className="border px-4 py-2">{request.urgency}</td>
                <td className="border px-4 py-2">
                  {request.bloodComponentType}
                </td>
                <td className="border px-4 py-2">
                  {request.hospital.hospitalname} -{" "}
                  {request.hospital.department}
                </td>
                <td className="border px-4 py-2">
                  {new Date(request.transfusionDateTime).toLocaleString()}
                </td>
                <td className="border px-4 py-2">{request.status}</td>
                <td className="border px-4 py-2">
                  {request.specialRequirements.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center mb-8">
        <div className="p-1 bg-gray-200 rounded-full shadow-md inline-flex space-x-2">
          <button
            onClick={() => setActiveButton("all")}
            className={`px-4 py-2 text-sm font-semibold transition duration-200 ${
              activeButton === "all"
                ? "bg-red-600 text-white rounded-full"
                : "bg-gray-200 text-gray-700 rounded-full"
            }`}
          >
            All Blood Requests
          </button>
          <button
            onClick={() => setActiveButton("your")}
            className={`px-4 py-2 text-sm font-semibold transition duration-200 ${
              activeButton === "your"
                ? "bg-red-600 text-white rounded-full"
                : "bg-gray-200 text-gray-700 rounded-full"
            }`}
          >
            Your Blood Requests
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        renderTable()
      )}
    </div>
  );
}
