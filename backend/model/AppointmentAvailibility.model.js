import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
  startTime: { type: String, required: true }, // Example: "09:00"
  endTime: { type: String, required: true }, // Example: "10:00"
  maxAppointments: { type: Number, required: true, min: 1 },
  bookedAppointments: { type: Number, default: 0, min: 0 },
});

const dailyScheduleSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
  timeSlots: [timeSlotSchema], // Each day will store multiple 1-hour slots
});

const bloodBankAvailabilitySchema = new mongoose.Schema(
  {
    bloodBankCode: {
      type: String,
      required: true,
      trim: true,
      match: /^[A-Z]{2}\d+$/, // Format validation (e.g., BB1, HB4)
    },
    schedule: [dailyScheduleSchema], // Each blood bank has a weekly schedule
  },
  {
    timestamps: true, // Auto timestamps (createdAt, updatedAt)
  }
);

export default mongoose.models.AppointmentAvailability || mongoose.model("AppointmentAvailability", bloodBankAvailabilitySchema);
