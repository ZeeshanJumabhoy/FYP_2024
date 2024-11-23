import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const BloodBankSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    contactEmail: { type: String, required: true, unique: true },
    bloodBankId: { type: String, unique: true }, // Only store the generated bloodBankId
    bloodBankCode: { type: String, required: true },
  },
  { timestamps: true }
);

// Apply auto-increment plugin to generate a unique bloodBankId
BloodBankSchema.plugin(AutoIncrement, {
  id: "blood_bank_seq",
  inc_field: "incrementId", // Internal incrementing ID, not saved to DB
});

// Generate `bloodBankId` after incrementId is set
BloodBankSchema.post("save", async function (doc, next) {
  if (!doc.bloodBankId) {
    // Generate bloodBankId based on incrementId
    doc.bloodBankId = `${doc.bloodBankCode}${doc.incrementId}`; // For example, BB1, BB2, etc.
    next();
  } else {
    next();
  }
});

export default mongoose.models.BloodBanks || mongoose.model('BloodBank', BloodBankSchema);
