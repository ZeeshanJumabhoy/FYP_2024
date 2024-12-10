import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getinventory } from "../Helper/helper";

const ViewBloodInventory = () => {
  const location = useLocation();
  const { bloodBankId, bloodBankName } = location.state || {};
  
  const [inventory, setInventory] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getinventory(bloodBankId);
        if (response?.data) {
          setInventory(response.data.data.inventory || []);
          setLastUpdated(response.data.data.updatedAt);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch inventory.");
      }
    };

    if (bloodBankId) {
      fetchData();
    }
  }, [bloodBankId]);

  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    return new Date(date).toLocaleDateString('en-US', options).replace(',', ' @');
  };

  return (
    <div className="flex flex-col min-h-screen p-3 bg-gradient-to-br from-black to-red-600">
      {/* Hero Image Section */}
      <div className="relative mb-4 flex-shrink-0" style={{ height: "40vh" }}>
        <img
          src="uploads/app/Cover.jpg"
          alt="Hero Image"
          className="w-full h-full object-cover rounded-lg"
        />
        <div
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          style={{
            background: "linear-gradient(to right, #000000, #FB3640)",
            mixBlendMode: "multiply",
          }}
        ></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-xl sm:text-3xl md:text-4xl font-bold mb-2">
            Blood Bank Inventory
          </h1>
          <p className="text-white text-sm sm:text-lg md:text-xl">
            Blood bags inventory last updated on {lastUpdated ? formatDate(lastUpdated) : "N/A"}
          </p>
        </div>
      </div>

      {/* Inventory Table Section */}
      <div className="bg-white shadow-md rounded-lg p-3 flex-grow overflow-auto">
        <h2 className="text-lg sm:text-xl font-semibold mb-3">Current Inventory</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse mb-4">
            <thead>
              <tr className="bg-red-400">
                <th className="px-2 py-1 border text-left text-xs sm:text-sm md:text-base">Blood Group</th>
                <th className="px-2 py-1 border text-left text-xs sm:text-sm md:text-base">Whole Blood</th>
                <th className="px-2 py-1 border text-left text-xs sm:text-sm md:text-base">Packed Cell Volume</th>
                <th className="px-2 py-1 border text-left text-xs sm:text-sm md:text-base">Fresh Frozen Plasma</th>
              </tr>
            </thead>
            <tbody>
              {inventory.length > 0 ? (
                inventory.map((item, index) => (
                  <tr key={item._id} className="border-b">
                    <td className="px-2 py-1 text-xs sm:text-sm md:text-base">{item.bloodGroup}</td>
                    <td className="px-2 py-1 text-xs sm:text-sm md:text-base">{item.wholeBlood}</td>
                    <td className="px-2 py-1 text-xs sm:text-sm md:text-base">{item.packedCellVolume}</td>
                    <td className="px-2 py-1 text-xs sm:text-sm md:text-base">{item.freshFrozenPlasma}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-2">No inventory data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewBloodInventory;
