import mongoose from 'mongoose';

/*export const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
    },
    cnic: {
        type: String,
        required: [true, 'CNIC is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    age: {
        type: String,
        required: [true, 'Age is required'],
    },
    bloodGroup: {
        type: String,
        required: [true, 'Blood group is required'],
    },
});*/
export const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    phoneNumber: {
            type: String,
            required: [true, 'Phone number is required'],
            unique: true,
    },
    cnic: {
        type: String,
        required: [true, 'CNIC is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    age: {
        type: String,
        required: [true, 'Age is required'],
    },
    bloodGroup: {
        type: String,
        required: [true, 'Blood group is required'],
    },
    username: {
        type: String,
        required: [true, 'Please provide a username']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    province: {
        type: String,
        required: [true, 'Province is required'],
    }, 
    city: {
        type: String,
        required: [true, 'City is required'],
    },
    district: {
        type: String,
        required: [true, 'District is required'],
    },
    pinCode: {
        type: String,
    },
    lastDonationMonth: {
        type: String,
    },
    lastDonationYear: {
        type: String,
    }
});


export default mongoose.model.Users || mongoose.model('User', UserSchema);