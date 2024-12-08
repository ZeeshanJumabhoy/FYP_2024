import mongoose from 'mongoose';
const { Schema } = mongoose;

const AppointmentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    bloodBankName: {
      type: String,
      required: true,
    },
    bloodBankId: {
      type: String, 
      required: true,
    },
    timeslot: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Appear', 'Not-Appear', null], // Allowing `null`
      default: null,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
