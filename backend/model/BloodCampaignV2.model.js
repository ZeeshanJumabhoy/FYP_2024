import mongoose from 'mongoose';
const { Schema } = mongoose;

const BloodCampaignV2Schema = new Schema({
    bloodBankName: { type: String, required: true },
    bloodBankId: { type: String, required: true },
    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },
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
    createdAt: { type: Date, default: Date.now },
});

// Export Archived Campaign Model
export default mongoose.models.BloodCampaignV2 || mongoose.model('BloodCampaignV2', BloodCampaignV2Schema);
