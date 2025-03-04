import mongoose from 'mongoose';
const { Schema } = mongoose;

const CredentialsSchema = new Schema(
  {
    bloodBankId: {
        type: String, 
        required: true,
      },
    authorizedPersonName: {
        type: String,
        required: true,
      },
    email: {
            type: String,
            required: true,
    },
    password: {
        type: String,
        required: true,
      }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default mongoose.models.BloodBankCredentials || mongoose.model('BloodBankCredentials', CredentialsSchema);
