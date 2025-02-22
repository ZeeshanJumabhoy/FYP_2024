import mongoose from 'mongoose';
const { Schema } = mongoose;

const BloodCampaignSchema = new Schema({
    bloodBankName: {
        type: String,
        required: true, // e.g., "Al-Khidmat Foundation Blood Bank"
    },
    bloodBankId: {
        type: String,
        required: true,
    },
    startDateTime: {
        type: Date,
        required: true, // Start date and time
        validate: {
            validator: function (value) {
                return value > new Date(); // Ensure start date is in the future
            },
            message: 'Start date and time must be in the future.',
        },
    },
    endDateTime: {
        type: Date,
        required: true, // End date and time
        validate: {
            validator: function (value) {
                return this.startDateTime && value > this.startDateTime; // Ensure endDateTime is later than startDateTime
            },
            message: 'End date and time must be later than start date and time.',
        },
    },
    venue: {
        name: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
    },
    contactDetails: {
        contactPerson: { type: String, required: true },
        phone: { type: String, required: true },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


export default mongoose.models.BloodCampaign || mongoose.model('BloodCampaign', BloodCampaignSchema);
