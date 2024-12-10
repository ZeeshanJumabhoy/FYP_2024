import React, { useState, useEffect } from "react";
import { getinventory, addinventory } from "../Helper/helper";
import toast, { Toaster } from "react-hot-toast";

const BloodInventoryManage = () => {
    const bloodBankId = "BB8"; // Hardcoded for now
    const bloodBankName = "Muhammmadi Blood Bank";

    const [inventory, setInventory] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [error, setError] = useState("");
    const [editableRow, setEditableRow] = useState(null);
    const [editedData, setEditedData] = useState({});  // This will hold the edited data for a specific row

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

    const handleEdit = (index) => {
        if (editableRow === index) {
            setEditableRow(null); // Exit edit mode if already editing the same row
            setEditedData({});
        } else {
            setEditableRow(index); // Enter edit mode for the selected row
            setEditedData({ ...inventory[index] }); // Initialize with current row data
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevState) => ({
            ...prevState,
            [name]: isNaN(value) ? value : parseFloat(value), // Parse numbers properly
        }));
    };

    const handleSave = () => {
        if (editableRow !== null) {
            // Update the inventory with the edited data for the specific row
            const updatedInventory = inventory.map((item, index) =>
                index === editableRow ? { ...item, ...editedData } : item
            );

            setInventory(updatedInventory); // Update state with modified inventory
            setEditableRow(null); // Exit edit mode
            setEditedData({}); // Clear edited data
            toast.success('Changes saved successfully!');
        }
    };


    const handleSubmit = async () => {
        try {
            // Structure the data in the required format
            const formattedData = {
                bloodBankId: bloodBankId,
                bloodBankName: bloodBankName,
                inventory: inventory.map(item => ({
                    bloodGroup: item.bloodGroup,
                    wholeBlood: item.wholeBlood,
                    packedCellVolume: item.packedCellVolume,
                    freshFrozenPlasma: item.freshFrozenPlasma
                }))
            };

            // Call the addinventory function and pass the structured data
            const response = await addinventory(formattedData);

            // Check for success response
            if (response?.data) {
                toast.success('Inventory added successfully!');
            } else if (response?.message) {
                toast.error(response.message);  // Show the error message from response
            } else {
                toast.error('Unknown error occurred.');
            }
        } catch (error) {
            // Handle any errors here (network errors, unexpected errors, etc.)
            console.error('Error adding inventory:', error);
            toast.error('Error adding inventory. Please try again.');
        }
    };


    return (
        <div className="flex flex-col min-h-screen p-3 bg-gradient-to-br from-black to-red-600">
            <Toaster />
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
                                <th className="px-2 py-1 border text-left text-xs sm:text-sm md:text-base">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.length > 0 ? (
                                inventory.map((item, index) => (
                                    <tr key={item._id} className="border-b">
                                        <td className="px-2 py-1 text-xs sm:text-sm md:text-base">
                                            {/* Blood Group is always non-editable */}
                                            {item.bloodGroup}
                                        </td>
                                        <td className="px-2 py-1 text-xs sm:text-sm md:text-base">
                                            {editableRow === index ? (
                                                <input
                                                    type="number"
                                                    name="wholeBlood"
                                                    value={editedData.wholeBlood || item.wholeBlood}
                                                    onChange={handleInputChange}
                                                    className="border p-1"
                                                />
                                            ) : (
                                                item.wholeBlood
                                            )}
                                        </td>
                                        <td className="px-2 py-1 text-xs sm:text-sm md:text-base">
                                            {editableRow === index ? (
                                                <input
                                                    type="number"
                                                    name="packedCellVolume"
                                                    value={editedData.packedCellVolume || item.packedCellVolume}
                                                    onChange={handleInputChange}
                                                    className="border p-1"
                                                />
                                            ) : (
                                                item.packedCellVolume
                                            )}
                                        </td>
                                        <td className="px-2 py-1 text-xs sm:text-sm md:text-base">
                                            {editableRow === index ? (
                                                <input
                                                    type="number"
                                                    name="freshFrozenPlasma"
                                                    value={editedData.freshFrozenPlasma || item.freshFrozenPlasma}
                                                    onChange={handleInputChange}
                                                    className="border p-1"
                                                />
                                            ) : (
                                                item.freshFrozenPlasma
                                            )}
                                        </td>
                                        <td className="px-2 py-1 text-xs sm:text-sm md:text-base">
                                            {editableRow === index ? (
                                                <button
                                                    onClick={handleSave}
                                                    className="px-4 py-2 rounded bg-green-500 text-white"
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleEdit(index)}
                                                    className="px-4 py-2 rounded bg-blue-500 text-white"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-2">No inventory data available</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

                {/* Submit Button */}
                <div className="flex justify-start">
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-red-500 text-white rounded-md mt-4"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BloodInventoryManage;
