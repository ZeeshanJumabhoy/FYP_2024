import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence"; // Import the sequence plugin

const AutoIncrement = mongooseSequence(mongoose); // Initialize the plugin

const bloodrequestSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true, // Ensure uniqueness
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    patientName: {
      type: String,
      required: true,
      trim: true,
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    units: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    weight: {
      type: Number,
      required: true,
      min: 0,
    },
    antibodies: {
      type: String,
      required: true,
      enum: [
        'None',
        'Anti-A',
        'Anti-B',
        'Anti-D',
        'Anti-A and Anti-B',
        'Anti-A, Anti-D',
        'Anti-B, Anti-D',
        'Anti-A and Anti-B, Anti-D',
      ],
    },
    specialRequirements: {
      type: [String],
      enum: [
        'None',
        'Irradiated Blood',
        'Leukocyte Reduced',
        'Washed Blood',
        'CMV-Negative Blood',
        'HLA-Matched Platelets',
        'Fresh Blood (<5 Days Old)',
      ],
      default: ['None'],
    },
    medicalReason: {
      type: String,
      required: true,
      enum: [
        'Anemia',
        'Trauma/Emergency Surgery',
        'Elective Surgery',
        'Cancer Treatment',
        'Organ Transplant',
        'Burn Treatment',
        'Bleeding Disorder (e.g., Hemophilia)',
        'Pregnancy/Childbirth Complications',
        'Heart Surgery',
        'Liver Disease',
        'Kidney Disease',
        'Neonatal Transfusion',
        'Other',
      ],
    },
    otherMedicalReason: {
      type: String,
      required: function () {
        return this.medicalReason === 'Other';
      },
      trim: true,
    },
    urgency: {
      type: String,
      required: true,
      enum: ['Emergency', 'Urgent', 'Routine'],
    },
    bloodComponentType: {
      type: String,
      required: true,
      enum: [
        'Whole Blood',
        'Red Blood Cells (RBCs)',
        'Platelets',
        'Plasma',
        'Cryoprecipitate',
        'Granulocytes',
      ],
    },
    allergiesAndReactions: {
      type: String,
      trim: true,
    },
    hospital: {
      hospitalname: {
        type: String,
        trim: true,
      },
      department: {
        type: String,
        trim: true,
      },
      patientId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
    },
    transfusionDateTime: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > new Date();
        },
        message: 'Transfusion date and time must be in the future',
      },
    },
    status: {
      type: String,
      enum: ['Pending', 'In-Process', 'Denied', 'Completed'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);


bloodrequestSchema.plugin(AutoIncrement, { inc_field: 'id' });

export default mongoose.models.Request || mongoose.model('Request', bloodrequestSchema);