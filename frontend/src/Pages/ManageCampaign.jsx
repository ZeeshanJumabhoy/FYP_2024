import React, { useState, useEffect } from 'react';
import campaign from "/uploads/app/Campaign.png?url"; // Replace with your image or use a placeholder
import { addCampaign } from '../Helper/helper';
import toast, { Toaster } from 'react-hot-toast';

const initialEvents = [
    {
        id: 1,
        date: '2024-12-15T09:00',
        title: 'Blood Donation Drive',
        description: 'Join us to save lives through blood donation.',
        startTime: '2024-12-15T09:00',
        endTime: '2024-12-15T12:00',
        location: 'Community Hall, Downtown',
        image: campaign,
    },
    {
        id: 2,
        date: '2024-12-20T10:00',
        title: 'Plasma Donation Camp',
        description: 'Your plasma donation can save critical patients.',
        startTime: '2024-12-20T10:00',
        endTime: '2024-12-20T14:00',
        location: 'Health Center, Uptown',
        image: campaign,
    },
];

const Event = ({ event, onDelete, onEdit }) => (
    <div id={event.id} className="flex flex-col md:flex-row mt-4 bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-red-300 p-4 md:w-1/4 flex items-center justify-center">
            <div className="text-red-900 font-bold text-lg">
                {new Date(event.startTime).toLocaleString('default', { month: 'long' }).toUpperCase()} <br />
                <div className="flex justify-center items-center">
                    <span className="text-3xl">{new Date(event.startTime).getDate()}</span>
                </div>
            </div>
        </div>
        <div className="md:w-2/4 p-4">
            <h3 className="text-xl font-bold">
                {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}{new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </h3>
            <p className="text-lg font-semibold text-gray-700">{event.title}</p>
            <p className="text-gray-600">Location: {event.location}</p>
            <p className="text-gray-600">Description: {event.description}</p>
        </div>
        <div className="md:w-1/4 relative">
            <img src={event.image} alt={`${event.title} event poster`} className="w-full h-48 object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition">
                <button onClick={() => onEdit(event)} className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 m-2">
                    Edit
                </button>
                <button onClick={() => onDelete(event.id)} className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 m-2">
                    Delete
                </button>
            </div>
        </div>
    </div>
);

const AdminForm = ({ addEvent, editingEvent, updateEvent, cancelEdit }) => {

    const [formData, setFormData] = useState({
        startDateTime: '',
        endDateTime: '',
        venue: {
            name: '',
            street: '',
            city: '',
            state: '',
        },
        contactDetails: {
            contactPerson: '',
            phone: '',
        },
    });

    const [preview, setPreview] = useState(campaign);

    // Populate form data when editing an event
    useEffect(() => {
        if (editingEvent) {
            const startDateTime = new Date(editingEvent.startDateTime);
            const endDateTime = new Date(editingEvent.endDateTime);

            setFormData({
                ...editingEvent,
                startDateTime: startDateTime.toISOString().slice(0, 16),  // Correct format for datetime-local
                endDateTime: endDateTime.toISOString().slice(0, 16),      // Correct format for datetime-local
                venue: editingEvent.venue || { name: '', street: '', city: '', state: '' },
                contactDetails: editingEvent.contactDetails || { contactPerson: '', phone: '' },
            });
            setPreview(editingEvent.image || campaign);
        }
    }, [editingEvent]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const fieldNames = name.split('.');  // Handle nested field names (e.g., venue.name)

        if (fieldNames.length === 2) {
            setFormData({
                ...formData,
                [fieldNames[0]]: {
                    ...formData[fieldNames[0]],
                    [fieldNames[1]]: value,
                },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDateTime = new Date();
        const eventStartTime = new Date(formData.startDateTime);
    
        if (eventStartTime < currentDateTime) {
            alert('Event start time cannot be in the past.');
            return;
        }
    
        if (!formData.startDateTime || !formData.endDateTime || !formData.venue.name || !formData.contactDetails.contactPerson || !formData.contactDetails.phone) {
            alert('All fields are required.');
            return;
        }
    
        // Adding bloodBankId and bloodBankName to formData
        const campaignData = {
            bloodBankId: "BB8", // Static values as per your example
            bloodBankName: "Muhammmadi Blood Bank", // Static values as per your example
            ...formData,
        };
    
        console.log(campaignData);  // This will log the object with the required fields
    
        try {
            let response;
            if (editingEvent) {
                // If editing an existing event
                response = await addCampaign({ ...formData, id: editingEvent.id });
                toast(response);
            } else {
                // If adding a new event
                response = await addCampaign(campaignData);
                toast(response);
            }

    
            // Reset form data and preview image after submission
            setFormData({
                startDateTime: '',
                endDateTime: '',
                venue: { name: '', street: '', city: '', state: '' },
                contactDetails: { contactPerson: '', phone: '' },
            });
            setPreview(campaign);  // Reset preview to default image
        } catch (error) {
            // Handle any errors that might occur during the API call
            console.error(error);
            toast.error('Error while adding campaign.');
        }
    };
    



    const handleCancel = () => {
        cancelEdit();  // Reset editingEvent to null in parent component
        // Reset form data and preview image
        setFormData({
            startDateTime: '',
            endDateTime: '',
            venue: { name: '', street: '', city: '', state: '' },
            contactDetails: { contactPerson: '', phone: '' },
        });
        setPreview(campaign);
    };

    return (
        <div>
            <Toaster />
            <form id="admin-form" onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mt-8">
                <h2 className="text-xl font-bold text-red-900 mb-4">{editingEvent ? 'Edit Campaign' : 'Add New Campaign'}</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Start Date & Time</label>
                    <input
                        type="datetime-local"
                        name="startDateTime"
                        value={formData.startDateTime}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">End Date & Time</label>
                    <input
                        type="datetime-local"
                        name="endDateTime"
                        value={formData.endDateTime}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Venue Name</label>
                    <input
                        type="text"
                        name="venue.name"
                        value={formData.venue.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Venue Street</label>
                    <input
                        type="text"
                        name="venue.street"
                        value={formData.venue.street}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Venue City</label>
                    <input
                        type="text"
                        name="venue.city"
                        value={formData.venue.city}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Venue State</label>
                    <input
                        type="text"
                        name="venue.state"
                        value={formData.venue.state}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Contact Person</label>
                    <input
                        type="text"
                        name="contactDetails.contactPerson"
                        value={formData.contactDetails.contactPerson}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Contact Phone</label>
                    <input
                        type="text"
                        name="contactDetails.phone"
                        value={formData.contactDetails.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition"
                >
                    {editingEvent ? 'Update Campaign' : 'Add Campaign'}
                </button>
                {editingEvent && (
                    <button
                        type="button"
                        onClick={handleCancel}  // Call handleCancel to reset form
                        className="ml-4 bg-gray-400 text-white font-bold py-2 px-4 rounded hover:bg-gray-500 transition"
                    >
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
};


const ManageCampaign = () => {
    const [events, setEvents] = useState(initialEvents);
    const [editingEvent, setEditingEvent] = useState(null);

    const addEvent = (newEvent) => {
        setEvents((prevEvents) => [...prevEvents, newEvent]);
        // Scroll to the newly added event
        const eventElement = document.getElementById(newEvent.id.toString());
        if (eventElement) {
            eventElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    const updateEvent = (updatedEvent) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
        );
        setEditingEvent(null);  // Reset editingEvent after update

        // Scroll to the updated event
        const eventElement = document.getElementById(updatedEvent.id.toString());
        if (eventElement) {
            eventElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    const deleteEvent = (id) => {
        setEvents((prevEvents) => prevEvents.filter(event => event.id !== id));
    };

    const editEvent = (event) => {
        setEditingEvent(event);
        // Scroll to the form
        document.getElementById("admin-form").scrollIntoView({ behavior: "smooth" });
    };

    const cancelEdit = () => {
        setEditingEvent(null);  // Reset editingEvent to null to indicate no event is being edited
    };

    // Grouping events by month and year
    const groupedEvents = events.reduce((acc, event) => {
        const monthYear = `${new Date(event.startTime).toLocaleString('default', { month: 'long' })} ${new Date(event.startTime).getFullYear()}`;
        if (!acc[monthYear]) {
            acc[monthYear] = [];
        }
        acc[monthYear].push(event);
        return acc;
    }, {});

    // Sorting events by date (ascending order)
    const sortedEvents = Object.keys(groupedEvents)
        .sort((a, b) => new Date(a.split(' ')[1], new Date(Date.parse(a.split(' ')[0] + ' 1, 2020')).getMonth()) - new Date(b.split(' ')[1], new Date(Date.parse(b.split(' ')[0] + ' 1, 2020')).getMonth()))
        .reduce((acc, monthYear) => {
            acc[monthYear] = groupedEvents[monthYear];
            return acc;
        }, {});

    return (
        <div className="bg-gray-100">
            <div className="relative">
                <img
                    src="https://placehold.co/1920x400"
                    alt="Blood bank campaigns banner"
                    className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-4xl font-bold">Blood Bank Campaigns</h1>
                    <p className="mt-2">Join us in saving lives. Explore upcoming blood donation and plasma drives below.</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto py-12 px-4">
                {Object.keys(sortedEvents).map(monthYear => (
                    <div key={monthYear} className="mb-8">
                        <h2 className="text-2xl font-bold text-red-900">{monthYear}</h2>
                        <div className="border-t-2 border-red-900 mt-2"></div>
                        {sortedEvents[monthYear].map(event => (
                            <Event key={event.id} event={event} onDelete={deleteEvent} onEdit={editEvent} />
                        ))}
                    </div>
                ))}

                <AdminForm
                    addEvent={addEvent}
                    editingEvent={editingEvent}
                    updateEvent={updateEvent}
                    cancelEdit={cancelEdit}
                />
            </div>
        </div>
    );
};

export default ManageCampaign;