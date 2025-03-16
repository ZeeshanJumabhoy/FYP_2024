import mongoose from "mongoose";

const bloodRequestStatusSchema = new mongoose.Schema(
  {
    requestId: {
      type: mongoose.Schema.Types.Number, // Reference to Blood Request ID
      ref: "Request",
      required: true,
      unique: true, // Each request has one status document
    },
    totalRequiredUnits: {
      type: Number,
      required: true, // Matches Request.units
    },
    donors: [
      {
        donorEmail: { type: String, required: true, trim: true },
        status: {
          type: String,
          enum: ["Interested", "Under Screening", "Completed"],
          default: "Interested",
        },
      }
    ],
    status: {
      type: String,
      enum: ["Waiting for Donors", "In Progress", "Completed"],
      default: "Waiting for Donors",
    },
  },
  { timestamps: true }
);

export default mongoose.models.BloodRequestStatus || mongoose.model("BloodRequestStatus", bloodRequestStatusSchema);
