import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBloodBank } from "../Helper/helper";
import Poster from "../Main/Poster";
import "../Styles/BookAppointment.css";
import { provinceData, cityData } from "../Helper/location"; // Import state and city data

const BloodBankInventory = () => {
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    city: "All",
    state: "All",
    name: "",
  });

  useEffect(() => {
    const confirmed = localStorage.getItem("isConfirmed");
    if (confirmed === "true") {
      setIsConfirmed(true);
      fetchBloodBanks(); // Fetch data immediately if already confirmed
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("isConfirmed", "true");
    setIsConfirmed(true);
    fetchBloodBanks(); // Fetch blood bank data on confirmation
  };

  const handleBookAppointment = (bloodBankId, bloodBankName) => {
    navigate("/ViewBloodInventory", { state: { bloodBankId, bloodBankName } }); // Pass bloodBankId as state
  };

  const fetchBloodBanks = async () => {
    try {
      const response = await getBloodBank();
      if (Array.isArray(response)) {
        setBloodBanks(response);
        setFilteredBanks(response); // Initialize with all banks
      } else if (response && Array.isArray(response.data)) {
        setBloodBanks(response.data);
        setFilteredBanks(response.data);
      } else {
        console.error("Unexpected data format:", response);
      }
    } catch (error) {
      console.error("Failed to fetch blood banks:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const filtered = bloodBanks.filter((bank) => {
      const matchesCity =
        searchCriteria.city === "All" || bank.city === searchCriteria.city;
      const matchesState =
        searchCriteria.state === "All" || bank.state === searchCriteria.state;
      const matchesName =
        searchCriteria.name === "" ||
        bank.name.toLowerCase().includes(searchCriteria.name.toLowerCase());

      return matchesCity && matchesState && matchesName;
    });
    setFilteredBanks(filtered);
  }, [searchCriteria, bloodBanks]);

  return (
    <div>
      {!isConfirmed && <Poster onConfirm={handleConfirm} />}
      {isConfirmed && (
        <div className="appointment-content">
          <h1>Available Blood Banks</h1>

          <div>
            {/* Filters Section */}
            <div className="filters-container">
              <div className="filter">
                <label>Search By State</label>
                <select
                  name="state"
                  value={searchCriteria.state}
                  onChange={handleFilterChange}
                >
                  <option value="All">All</option>
                  {provinceData.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter">
                <label>Search By City</label>
                <select
                  name="city"
                  value={searchCriteria.city}
                  onChange={handleFilterChange}
                >
                  <option value="All">All</option>
                  {cityData[searchCriteria.state]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter">
                <label>Search By Name</label>
                <input
                  type="text"
                  name="name"
                  value={searchCriteria.name}
                  onChange={handleFilterChange}
                  placeholder="Enter blood bank name"
                />
              </div>
              <button className="search-button">Search</button>
            </div>

            {/* Blood Bank Cards */}
            <div className="blood-bank-container">
              {filteredBanks.length > 0 ? (
                filteredBanks.map((bank) => (
                  <div key={bank._id} className="blood-bank-card">
                    <h2>{bank.name}</h2>
                    <p>
                      {bank.city}, {bank.state}
                    </p>
                    <p>
                      📍 <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bank.name + ' ' + bank.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {bank.address}
                      </a>
                    </p>
                    <hr className="card-divider" />
                    <p>
                      📞 {bank.phoneNumber} <br />
                      ✉️ {bank.contactEmail}
                    </p>
                  </div>
                ))
              ) : (
                <p>No blood banks found for the selected filters.</p>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default BloodBankInventory;
