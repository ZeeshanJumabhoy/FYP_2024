import mongoose from 'mongoose'; 
export const FamilySchema = new mongoose.Schema({
    primaryUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the primary user in the User collection
        required: true
    },
    familyName: {
        type: String,
        required: true // This could be the last name of the head of the family or a unique family identifier
    },
    contactEmail: {
        type: String,
        required: true // The email used for OTP and family-level verification
    },
    familyMembers: [
        {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            cnic: { type: String, required: true, unique: true },
            age: { type: String, required: true }
        }
    ]
});

export default mongoose.model.Familys || mongoose.model('Family', FamilySchema);