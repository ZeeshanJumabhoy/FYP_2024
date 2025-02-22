import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useFetch from "../hooks/fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "../Styles/tailwind.css";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export default function RequestBlood() {
  const navigate = useNavigate();
  const [{ apiData, isLoading: emailLoading, error: emailError }] = useFetch();
  const { email, firstName } = apiData || {};
  const userEmail = email;
  const [activeButton, setActiveButton] = useState("all");
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all pending blood requests by default
  const [{ apiData: allRequests, isLoading: allLoading, error: allError }] =
    useFetch("getAllPendingBloodRequests");

  const [userRequests, setUserRequests] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState(null);

  // Fetch user's specific blood requests
  // Replace wiTh dynamic email
  useEffect(() => {
    if (userEmail) {
      const fetchUserRequests = async () => {
        setUserLoading(true);
        try {
          const response = await axios.get(`/api/getbloodrequestinfo/${userEmail}`);
          setUserRequests(response.data);
        } catch (error) {
          setUserError("No Blood Request have been made from Yourside");
          toast.error("No Blood Request have been made from Yourside");
        } finally {
          setUserLoading(false);
        }
      };
      fetchUserRequests();
    }
  }, [userEmail]);

  // Fetch data based on active button type
  const fetchData = (buttonType) => {
    setIsLoading(true);
    setError(null);

    if (buttonType === "all") {
      if (allError) {
        setError(
          <p style={{ 
              color: "black", 
              textAlign: "center", 
              fontWeight: "bold", 
              fontSize: "24px", 
              marginTop: "50px",
              marginBottom: "50px" 
          }}>
              Failed to load all blood requests
          </p>
      );

        toast.error("Failed to load all blood requests");
      } else if (allRequests) {
        setdata(allRequests.requests || []);
      }
    } else {
      if (userError) {
        <p style={{ 
              color: "black", 
              textAlign: "center", 
              fontWeight: "bold", 
              fontSize: "24px", 
              marginTop: "50px",
              marginBottom: "50px" 
          }}>
              Failed to load all blood requests
          </p>
        setError(<p style={{ 
          color: "black", 
          textAlign: "center", 
          fontWeight: "bold", 
          fontSize: "24px", 
          marginTop: "50px",
          marginBottom: "50px" 
      }}>
          No Blood Request have been made from Yourside
      </p>);
        toast.error("No Blood Request have been made from Yourside");
      } else if (userRequests) {
        setdata(userRequests.requests || []);
      }
    }

    setIsLoading(false);
  };

  // Load data on button change
  useEffect(() => {
    fetchData(activeButton);
  }, [activeButton, allRequests, userRequests, allError, userError]);

  // Function to apply color based on status
  // Function to apply color based on status
  // Function to apply color based on status
  const getStatusStyle = (status) => {
    switch (status) {
      case "In-Process":
        return "border !border-yellow-500 text-yellow-500 bg-white rounded-full px-3 py-1 text-sm font-semibold";
      case "Pending":
        return "border !border-blue-500 text-blue-500 bg-white rounded-full px-3 py-1 text-sm font-semibold";
      case "Denied":
        return "border !border-red-500 text-red-500 bg-white rounded-full px-3 py-1 text-sm font-semibold";
      case "Completed":
        return "border !border-green-500 text-green-500 bg-white rounded-full px-3 py-1 text-sm font-semibold";
      default:
        return "border border-gray-500 text-gray-500 bg-white rounded-full px-3 py-1 text-sm font-semibold";
    }
  };


  // Render Table based on active button
  const renderTable = () => {
    if (activeButton === "all") {
      return (
        <Table className="min-w-full bg-white border border-gray-300 table-fixed">
          <Thead>
            <Tr>
              <Th className="px-2 py-1 text-xs font-medium text-gray-600">Blood Group</Th>
              <Th className="px-2 py-1 text-xs font-medium text-gray-600">Units</Th>
              <Th className="px-2 py-1 text-xs font-medium text-gray-600">Urgency</Th>
              <Th className="px-2 py-1 text-xs font-medium text-gray-600">Medical Reason</Th>
              <Th className="px-2 py-1 text-xs font-medium text-gray-600">Antibodies</Th>
              <Th className="px-2 py-1 text-xs font-medium text-gray-600">Hospital</Th>
              <Th className="px-2 py-1 text-xs font-medium text-gray-600">Transfusion Date</Th>
              <Th className="px-2 py-1 text-xs font-medium text-gray-600">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((request, index) => (
              <Tr key={index} className="text-xs">
                <Td className="border px-2 py-1 truncate">{request.bloodGroup}</Td>
                <Td className="border px-2 py-1 truncate">{request.units}</Td>
                <Td className="border px-2 py-1 truncate">{request.urgency}</Td>
                <Td className="border px-2 py-1 truncate">{request.medicalReason}</Td>
                <Td className="border px-2 py-1 truncate">{request.antibodies}</Td>
                <Td className="border px-2 py-1 truncate">{request.hospitalName} - {request.department}</Td>
                <Td className="border px-2 py-1 truncate">
                  {request.TransfusionDateTime ? new Date(request.TransfusionDateTime).toLocaleString() : "N/A"}
                </Td>

                <Td className="border px-2 py-1 text-center">
                  <button
                    onClick={handleBookAppointment}
                    className="bg-blue-500 text-white px-2 py-1 text-xs font-semibold rounded-full hover:bg-blue-600 transition duration-200"
                  >
                    Save A Life
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

      );
    } else {
      return (
        <Table className="min-w-full bg-white border border-gray-300">
          <Thead>
            <Tr>
              <Th className="px-2 py-1 text-xs font-medium text-gray-600">Id</Th>
              <Th className="px-2 py-1 text-xs font-medium text-gray-600">Patient Name</Th>
              <Th className="px-2 py-1 text-xs font-medium text-gray-600">Blood Group</Th>
              <Th className="px-2 py-1 text-xs font-medium text-gray-600">Units</Th>
              <Th className="px-2 py-1 text-xs font-medium text-gray-600">Weight</Th>
              <Th className="px-2 py-1 text-xs font-medium text-gray-600">Urgency</Th>
              <Th className="px-2 py-1 text-xs font-medium text-gray-600">Status</Th>
              <Th className="px-2 py-1 text-xs font-medium text-gray-600">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((request, index) => (
              <Tr key={index} className="text-xs">
                <Td className="border px-2 py-1 truncate">{request.id}</Td>
                <Td className="border px-2 py-1 truncate">{request.patientName}</Td>
                <Td className="border px-2 py-1 truncate">{request.bloodGroup}</Td>
                <Td className="border px-2 py-1 truncate">{request.units}</Td>
                <Td className="border px-2 py-1 truncate">{request.weight}</Td>
                <Td className="border px-2 py-1 truncate">{request.urgency}</Td>
                <Td className="border px-4 py-2 text-center">
                  <span className={`${getStatusStyle(request.status)}`}>
                    {request.status}
                  </span>
                </Td>
                <Td className="border px-4 py-2 text-center space-x-4"> {/* Action Icons */}
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    onClick={() => handleEdit(request)} // Existing logic
                    title="Edit"
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleDelete(request.id)} // Pass the custom "id"
                    title="Delete"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      );
    }
  };

  const handleEdit = (request) => {
    // Navigate to the BloodRequestUpdate page with the id
    navigate(`/BloodRequestUpdate/${request.id}`);
  };
  

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/deletebloodrequest/${id}`);
      
      if (response.status === 200) {
        setdata((prevData) => prevData.filter((request) => request.id !== id));

        toast.success("Blood request deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting blood request:", error);
      toast.error("Failed to delete blood request. Please try again.");
    }
  };

  const handleBookAppointment = () => {
    navigate('/Questions');
  };
  
  

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center mb-8">
        <div className="p-1 bg-gray-200 rounded-full shadow-md inline-flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <button
            onClick={() => setActiveButton("all")}
            className={`px-2 py-1 md:px-4 md:py-2 text-sm font-semibold transition duration-200 ${activeButton === "all"
              ? "bg-red-600 text-white rounded-full"
              : "bg-gray-200 text-gray-700 rounded-full"
              }`}
          >
            All Blood Requests
          </button>
          <button
            onClick={() => setActiveButton("your")}
            className={`px-2 py-1 md:px-4 md:py-2 text-sm font-semibold transition duration-200 ${activeButton === "your"
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
        <div className="overflow-x-auto">
          {renderTable()}
        </div>
      )}
    </div>

  );
}
