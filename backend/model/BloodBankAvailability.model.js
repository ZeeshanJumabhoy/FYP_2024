import mongoose from "mongoose";

const bloodBankAvailabilitySchema = new mongoose.Schema(
  {
    bloodBankCode: {
      type: String,
      required: true, // Unique code identifying the blood bank
      trim: true,
      match: /^[A-Z]{2}\d+$/,
    },
    schedule: [
      {
        day: {
          type: String,
          required: true,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
        timeSlots: [
          {
            startTime: {
              type: String,
              required: true, // Example: "09:00"
            },
            endTime: {
              type: String,
              required: true, // Example: "17:00"
            },
            maxAppointments: {
              type: Number,
              required: true,
              min: 1,
            },
            bookedAppointments: {
              type: Number,
              default: 0,
              min: 0,
              validate: {
                validator: function (value) {
                  return value <= this.maxAppointments;
                },
                message:
                  "Booked appointments cannot exceed the maximum allowed appointments",
              },
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the schema
export default mongoose.models.Availability ||
  mongoose.model("Availability", bloodBankAvailabilitySchema);