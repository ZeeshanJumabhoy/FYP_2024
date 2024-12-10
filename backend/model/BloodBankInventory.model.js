import mongoose from 'mongoose';
const { Schema } = mongoose;

const BloodBankInventorySchema = new Schema(
  {
    bloodBankName: {
      type: String,
      required: true, // e.g., "Al-Khidmat Foundation Blood Bank"
    },
    bloodBankId: {
      type: String,
      required: true,
    },
    inventory: [
      {
        bloodGroup: {
          type: String,
          required: true, // e.g., "A+", "O-", etc.
        },
        wholeBlood: {
          type: Number,
          required: true, // e.g., 0
          min: 0,
        },
        packedCellVolume: {
          type: Number,
          required: true, // e.g., 20
          min: 0,
        },
        freshFrozenPlasma: {
          type: Number,
          required: true, // e.g., 125
          min: 0,
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default mongoose.models.Inventory || mongoose.model('Inventory', BloodBankInventorySchema);
