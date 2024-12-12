import React, { useState, useEffect } from "react";
import campaign from "/uploads/app/Campaign.png?url";
import cover from "/uploads/app/CampaignCover.jpg?url";
import { getcampaign } from "../Helper/helper"; // Assuming this function fetches data

const getMonthName = (date) => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];
    return months[new Date(date).getMonth()];
};

// ViewCampaign Component
const ViewCampaign = ({ event }) => (
    <div className="flex flex-col md:flex-row mt-4 p-4 border rounded-lg shadow-md bg-white">
        {/* Show only the month */}
        <div className="md:w-1/4 text-red-900 font-bold text-2xl text-center">
            {getMonthName(event?.startDateTime)}
        </div>
        <div className="md:w-3/4">
            <h3 className="text-xl font-bold">{event?.bloodBankName || "Unknown Blood Bank"}</h3>
            <p className="text-lg">{event?.venue?.name || "Unknown Venue"}</p>
            <p className="text-gray-600">
                {event?.venue?.street}, {event?.venue?.city}, {event?.venue?.state}
            </p>
            <p className="text-gray-600">
                <strong>Contact:</strong> {event?.contactDetails?.contactPerson || "N/A"} -{" "}
                {event?.contactDetails?.phone || "N/A"}
            </p>
            <p className="text-gray-600">
                <strong>Start:</strong> {event?.startDateTime}
            </p>
            <p className="text-gray-600">
                <strong>End:</strong> {event?.endDateTime}
            </p>
            <button className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
                Book Appointment Now
            </button>
        </div>
        <div className="md:w-1/4 mt-4 md:mt-0">
            <img
                src={campaign}
                alt={`${event?.bloodBankName || "Event"} poster`}
                className="w-full h-auto rounded-lg"
            />
        </div>
    </div>
);

// App Component
const App = () => {
    const [events, setEvents] = useState([]); // State for managing events
    const [visibleCount, setVisibleCount] = useState(6); // State for managing visible events
    const [error, setError] = useState(""); // State for error handling

    // Fetch campaigns data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getcampaign();

                if (response?.data?.campaigns) {
                    // Map data to match required structure
                    const campaigns = response.data.campaigns.map((campaign) => ({
                        id: campaign._id,
                        bloodBankName: campaign.bloodBankName,
                        venue: campaign.venue,
                        contactDetails: campaign.contactDetails,
                        startDateTime: campaign.startDateTime,
                        endDateTime: campaign.endDateTime,
                        startDate: new Date(campaign.startDateTime).toLocaleDateString(),
                        endDate: new Date(campaign.endDateTime).toLocaleDateString(),
                    }));
                    setEvents(campaigns);
                } else {
                    throw new Error(response.message || "Failed to fetch campaigns.");
                }
            } catch (err) {
                setError(err.message || "Failed to fetch campaigns.");
            }
        };

        fetchData();
    }, []);

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 6, events.length));
    };

    // Slice the events to only show the visible ones
    const visibleEvents = events.slice(0, visibleCount);

    return (
        <div className="bg-gray-100">
            {/* Header Section */}
            <div className="relative">
                <img
                    src={cover}
                    alt="Blood bank campaigns banner"
                    className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-4xl font-bold">Blood Bank Campaigns</h1>
                    <p className="text-2xl mt-2 text-black">
                        Join us in saving lives. Explore upcoming blood donation and plasma drives below.
                    </p>
                </div>
            </div>

            {/* Events Section */}
            <div className="max-w-6xl mx-auto py-12 px-4">
                {error && <p className="text-red-600 text-center">{error}</p>}
                {visibleEvents.map((event) => (
                    <ViewCampaign key={event.id} event={event} />
                ))}

                {/* Load More Button */}
                {visibleCount < events.length && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleLoadMore}
                            className="bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                        >
                            View More Campaigns
                        </button>
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default App;
