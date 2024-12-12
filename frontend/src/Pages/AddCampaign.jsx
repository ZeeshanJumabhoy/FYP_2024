import React, { useState, useEffect } from 'react';
import { addCampaign } from '../Helper/helper';
import toast, { Toaster } from 'react-hot-toast';
import cover from "/uploads/app/CampaignCover.jpg?url";
import campaign from "/uploads/app/Campaign.png?url"; // Replace with your image or use a placeholder

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
                response = await addCampaign({ ...formData, id: editingEvent.id });
            } else {
                response = await addCampaign(campaignData);
            }

            // Make sure response is a string before passing it to toast
            const message = response?.message || 'Campaign added successfully!';
            toast(message);

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
            <div className="relative">
                <img
                    src={cover}
                    alt="Blood bank campaigns banner"
                    className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-4xl font-bold">Blood Bank Campaigns</h1>
                    <p className="mt-2">Join us in saving lives. Explore upcoming blood donation and plasma drives below.</p>
                </div>
            </div>
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

export default AdminForm;
