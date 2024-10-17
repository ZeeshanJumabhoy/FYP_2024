import mongoose from "mongoose";

export const CorporateSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Company name is required'],
    },
    companyType:{
        type: String,
        required: [true, 'Company type is required'],
    },
    companyEmployeesNum:{
        type: String,
        required: [true, 'Employee Number is required'],
    }
    ,
    companyEmail: {
        type: String,
        required: [true, 'Company email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    companyAddress: {
        type: String,
        required: true
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
    contactPerson: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        cnic: { type: String, required:true}
    }
});

export default mongoose.model.Corporates || mongoose.model('Corporate', CorporateSchema);