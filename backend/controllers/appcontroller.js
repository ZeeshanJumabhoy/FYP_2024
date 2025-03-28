import UserModel from '../model/User.model.js';
import Family from '../model/Family.model.js';
import Request from '../model/Request.model.js';
import RequestStatus from '../model/BloodRequestStatus.model.js';
import Corporate from '../model/Corporate.model.js';
import BloodBank from '../model/Bloodbank.model.js';
import Availability from '../model/AppointmentAvailibility.model.js';
import Appointment from '../model/Appointment.model.js';
import Inventory from '../model/BloodBankInventory.model.js';
import BloodCampaign from '../model/Campaign.model.js';
import BloodCampaignV2 from '../model/BloodCampaignV2.model.js'; // For past campaigns
import BloodBankCredentials from '../model/BloodBankCredentials.model.js';
import cron from 'node-cron';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import otpGenerator from 'otp-generator';
import axios from 'axios';
dotenv.config();

/** POST: http://localhost:8080/api/register 
 * @param : {
  "firstname" : "John",
  "lastname" : "Doe",
  "phoneNumber" : "9232323232",
  "cnic" : "9232323232-323232-2",
  "email": "the_247@superverse.com",
  "username" : "the_247",
  "age" : "24",
  "bloodGroup" : "O+",
  "password" : "RAJ@482003", 
  "confitm-password" : "RAJ@482003",
  "province" : "Sindh",
  "city" : "Karachi",
  "district" : "Clifton",
  "pinCode" : "74000"
}
*/
/** 
export async function register(req, res) {
    try {
        const { firstName, lastName, phoneNumber, cnic, email, age, bloodGroup, username, password, province, city, district, pinCode, lastDonationMonth, lastDonationYear } = req.body;

        // Hash the password before saving
        const hashedPassword = await hashPassword(password);

        // Create a new user object
        const userData = {
            firstName,
            lastName,
            phoneNumber,
            cnic,
            email,
            age,
            bloodGroup,
            username,
            password: hashedPassword, // Use the hashed password
            province,
            city,
            district,
            pinCode,
            lastDonationMonth,
            lastDonationYear
        };

        // Save the user to the database
        const user = new UserModel(userData);
        await user.save();

        res.status(201).send({ msg: 'User Registered Successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'An internal error occurred.' });
    }
}
export async function registercheck(req, res) {
    try {
        const {phoneNumber, cnic, email} = req.body;

        // Check for duplicate phoneNumber, cnic, and email separately
        const phoneExists = await UserModel.findOne({ phoneNumber });
        const cnicExists = await UserModel.findOne({ cnic });
        const emailExists = await UserModel.findOne({ email });

        let errorMessages = [];

        if (phoneExists) {
            errorMessages.push('Phone number is already in use.');
        }
        if (cnicExists) {
            errorMessages.push('CNIC is already in use.');
        }
        if (emailExists) {
            errorMessages.push('Email is already in use.');
        }
        // If any of the fields are duplicates, return the specific error messages
        if (errorMessages.length > 0) {
            return res.status(400).send({ errors: errorMessages });
        }
        res.status(201).send({ msg: 'User Registered Successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'An internal error occurred.' });
    }
} */

// Register check function to verify if email, CNIC, or phone number exists
export async function registerCheck(req, res) {
    const { email, cnic, phoneNumber, familyMembers } = req.body;

    try {
        // Check if the primary user's email, CNIC, or phone number already exists
        const existingUser = await UserModel.findOne({ $or: [{ email }, { cnic }, { phoneNumber }] });
        const existingFamily = await Family.findOne({ contactEmail: email });

        // If the primary user already exists, return an error with the specific field
        if (existingUser) {
            return res.status(400).json({ message: 'The following detail is already in use', detail: existingUser.email ? existingUser.email : existingUser.cnic ? existingUser.cnic : existingUser.phoneNumber });
        }

        if (existingFamily) {
            return res.status(400).json({ message: 'Email is already associated with an existing family registration', detail: existingFamily.contactEmail });
        }

        // Handle case for individual form submission (no family members)
        if (!familyMembers || familyMembers.length === 0) {
            // Only primary user data is being submitted (individual form)
            return res.status(201).json({ message: 'All okay - Individual registration' });
        }

        // Check if the primary user's CNIC is already in use in the Families collection
        const existingFamilyWithPrimaryCnic = await Family.findOne({ 'familyMembers.cnic': cnic });
        if (existingFamilyWithPrimaryCnic) {
            return res.status(400).json({ message: 'This CNIC is already associated with an existing family registration', detail: cnic });
        }

        // Check each family member's CNIC for duplicates within the family members being registered
        const cnicSet = new Set();

        // Collect all family member CNICs and check for duplicates
        for (const member of familyMembers) {
            const memberCnic = member.cnic;

            // Check if this CNIC is already in the set (indicating a duplicate)
            if (cnicSet.has(memberCnic)) {
                return res.status(400).json({ message: 'Duplicate CNIC found among family members.', detail: memberCnic });
            }

            // Add the CNIC to the set
            cnicSet.add(memberCnic);
        }

        // Check if any family member's CNIC exists in the Users collection
        const existingFamilyMembersCnic = await UserModel.find({ cnic: { $in: [...cnicSet] } });

        if (existingFamilyMembersCnic.length > 0) {
            const existingCnics = existingFamilyMembersCnic.map(member => member.cnic);
            return res.status(400).json({ message: 'One or more family members have a CNIC that is already associated with an existing user.', details: existingCnics });
        }

        return res.status(201).json({ message: 'All okay - Family registration' });

    } catch (err) {
        return res.status(501).json({ message: 'Server error', error: err.message });
    }
}


// Registration function
export async function register(req, res) {
    const {
        firstName, lastName, email, phoneNumber, cnic, age, bloodGroup,
        username, password, province, city, district, pinCode, lastDonationMonth, lastDonationYear, userType,
        familyMembers, companyName, companyType, companyEmployeesNum, companyAddress, contactPerson
    } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        if (userType === 'individual') {
            // Register individual user
            const newUser = new UserModel({
                firstName, lastName, email, phoneNumber, cnic, age, bloodGroup,
                username, password: hashedPassword, province, city, district, pinCode,
                userType: 'individual',
                lastDonationMonth, // Add this field
                lastDonationYear   // Add this field
            });

            await newUser.save();
            return res.status(201).json({ message: 'Individual user registered successfully' });
        }
        else if (userType === 'family') {
            // Register family user
            const primaryUser = new UserModel({
                firstName, lastName, email, phoneNumber, cnic, age, bloodGroup,
                username, password: hashedPassword, province, city, district, pinCode, userType: 'family',
                lastDonationMonth, // Add this field
                lastDonationYear   // Add this field
            });

            await primaryUser.save();

            const family = new Family({
                primaryUserId: primaryUser._id,
                familyName: lastName,
                contactEmail: email,
                familyMembers: familyMembers.map(member => ({
                    firstName: member.firstName,
                    lastName: member.lastName,
                    cnic: member.cnic,
                    age: member.age
                }))
            });

            await family.save();
            return res.status(201).json({ message: 'Family registered successfully' });

        } else if (userType === 'corporate') {
            // Register corporate user
            const newCorporate = new Corporate({
                companyName: companyName,
                companyType: companyType,
                companyEmployeesNum: companyEmployeesNum,
                companyEmail: email,
                password: hashedPassword,
                companyAddress: companyAddress,
                province: province,
                city: city,
                district: district,
                pinCode: pinCode,
                contactPerson: {
                    name: contactPerson.name,
                    email: contactPerson.email,
                    phone: contactPerson.phone,
                    cnic: contactPerson.cnic
                }
            });

            await newCorporate.save();
            return res.status(201).json({ message: 'Corporate registered successfully' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
}

export async function registerBloodBankCredentials(req, res) {
    try {
        const { bloodBankId, authorizedPersonName, email, password, userEmail } = req.body;

        const existingCredential = await BloodBankCredentials.findOne({
            $or: [{ email }, { bloodBankId }]
        });

        if (existingCredential) {
            return res.status(400).json({ error: 'Email or Blood Bank ID already exists' });
        }

        const hashedPassword = await hashPassword(password);

        const newCredential = new BloodBankCredentials({
            bloodBankId,
            authorizedPersonName,
            email,
            password: hashedPassword
        });

        await newCredential.save();

        const emailData = {
            username: authorizedPersonName,
            userEmail: userEmail,
            subject: "Blood Safe Life - Blood Bank Registration Successful",
            mailType: "bloodbankcredentails",
            password: password,
            bloodbankemail: email
        };

        // Send email notification
        await axios.post('http://localhost:8080/api/send-mail', emailData);

        res.status(201).json({ message: 'Blood Bank Credentials Created Successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function updateBloodBankCredentials(req, res) {
    try {
        const { bloodBankId, oldPassword, newPassword, authorizedPersonName, email } = req.body;

        const credentials = await BloodBankCredentials.findOne({ bloodBankId });

        if (!credentials) {
            return res.status(404).json({ error: 'Blood Bank Credentials not found' });
        }

        // Handling comparePassword without modifying it
        try {
            await comparePassword(oldPassword, credentials.password);
        } catch (error) {
            return res.status(400).json({ error: 'Old password is incorrect' });
        }

        const updatedData = {
            authorizedPersonName: authorizedPersonName || credentials.authorizedPersonName,
            email: email || credentials.email
        };

        if (newPassword) {
            updatedData.password = await hashPassword(newPassword);
        }

        await BloodBankCredentials.updateOne({ bloodBankId }, { $set: updatedData });

        res.status(200).json({ message: 'Blood Bank Credentials Updated Successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function hashPassword(password) {
    return new Promise((resolve, reject) => {
        if (password) {
            bcrypt
                .hash(password, 10)
                .then((hashedPassword) => resolve(hashedPassword))
                .catch((error) => reject({ error: 'Unable to hash Password' }));
        } else {
            reject({ error: 'Invalid Password' });
        }
    });
}

export async function login(req, res) {

    try {
        const { email, password } = req.body;

        // Additional check to ensure email and password are present
        if (!email || !password) {
            return res.status(400).send({ error: 'Email or password missing' });
        }


        UserModel.findOne({ email })
            .then((data) => {
                comparePassword(password, data.password)
                    .then(() => {
                        // Create JWT Token
                        const load = { userId: data._id, username: data.username };
                        const expires = { expiresIn: '24h' };
                        const token = jwt.sign(load, process.env.JWT_SECRET_KEY, expires);

                        return res.status(200).send({
                            msg: 'Login Successfull',
                            username: data.username,
                            token: token,
                        });
                    })
                    .catch((err) => {
                        res.status(500).send(err);
                    });
            })
            .catch((err) => res.status(500).send({ error: 'Username Not Found' }));
    } catch (err) {
        return res.status(401).send(err);
    }
}

export async function loginBloodBank(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ error: 'Email or password missing' });
        }

        const bloodBank = await BloodBankCredentials.findOne({ email });

        if (!bloodBank) {
            return res.status(404).send({ error: 'Email not found' });
        }

        comparePassword(password, bloodBank.password)
            .then(() => {
                const payload = {
                    bloodBankId: bloodBank.bloodBankId,
                    email: bloodBank.email,
                    authorizedPersonName: bloodBank.authorizedPersonName
                };

                const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

                return res.status(200).send({
                    msg: 'Login Successful',
                    authorizedPersonName: bloodBank.authorizedPersonName,
                    bloodBankId: bloodBank.bloodBankId,
                    email: bloodBank.email,
                    token: token
                });
            })
            .catch((err) => {
                res.status(401).send({ error: 'Invalid password' });
            });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

export async function getUser(req, res) {
    try {
        const { email } = req.params;
        UserModel.findOne({ email })
            .then((data) => {
                const { password, ...rest } = Object.assign({}, data.toJSON());
                return res.status(201).send(rest);
            })
            .catch((err) => res.status(501).send({ error: 'Email Not Found' }));
    } catch (err) {
        return res.status(501).send(err);
    }
}

export async function getfetchUser(req, res) {
    try {
        const { id } = req.params;

        // Check if the id is valid
        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ error: 'Invalid User ID' });
        }

        // Find the user by ID
        const user = await UserModel.findOne({ _id: new ObjectId(id) });
        if (!user) {
            return res.status(404).send({ error: 'User Not Found' });
        }

        const { userType } = user;

        if (userType === "individual") {
            // Exclude unnecessary fields and return the individual user details
            const { firstName, lastName, phoneNumber, email, cnic, age, bloodGroup, province, city, district, pinCode, lastDonationMonth, lastDonationYear, userType } = user;
            return res.status(200).send({ firstName, lastName, phoneNumber, email, cnic, age, bloodGroup, province, city, district, pinCode, lastDonationMonth, lastDonationYear, userType });
        }
        else if (userType === "family") {
            // Fetch head of the family details
            const { firstName, lastName, phoneNumber, email, cnic, age, bloodGroup, province, city, district, pinCode, lastDonationMonth, lastDonationYear, userType } = user;

            // Fetch family members details from the Family model
            const family = await Family.findOne({ primaryUserId: new ObjectId(id) });
            if (!family) {
                return res.status(404).send({ error: 'Family data not found' });
            }

            // Include family members in the response
            const familyMembers = family.familyMembers.map(member => ({
                firstName: member.firstName,
                lastName: member.lastName,
                cnic: member.cnic,
                age: member.age
            }));

            return res.status(200).send({
                firstName, lastName, phoneNumber, email, cnic, age, bloodGroup,
                province, city, district, pinCode, lastDonationMonth, lastDonationYear, userType,
                familyMembers  // Add family members details
            });
        }

    } catch (err) {
        return res.status(500).send({ error: 'Internal Server Error', details: err });
    }
}

async function comparePassword(originalPass, hashedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt
            .compare(originalPass, hashedPassword)
            .then((isCorrect) => {
                if (isCorrect) {
                    console.log('Password Matched');
                    resolve();
                } else {
                    console.log('Password Not Matched');
                    reject({ error: "Password Doesn't Match" });
                }
            })
            .catch((err) => {
                console.error('Password Comparison Failed', err);
                reject({ error: 'Password Comparison Failed' });
            });
    });
}

export async function updateUser(req, res) {
    try {
        const { userId } = req.user; // Extract the userId from the authenticated user token
        const newData = req.body;
        const { cnic, phoneNumber, familyMembers, userType } = newData;

        // Check if userId is valid
        if (!userId) {
            return res.status(404).json({ message: 'Invalid User Id...!' });
        }

        // Step 1: Check if CNIC or phoneNumber already exists for another user (individual check)
        const userExists = await UserModel.findOne({
            $or: [{ cnic }, { phoneNumber }],
            _id: { $ne: userId }  // Exclude current user's own record
        });

        // Step 2: Check if the CNIC exists in the Family collection
        const familyCnicExists = await Family.findOne({
            'familyMembers.cnic': cnic
        });

        // If another user or family member with the same CNIC or phone number exists, return an error
        if (userExists || familyCnicExists) {
            return res.status(400).json({
                message: 'CNIC or Phone Number already registered...!',
                detail: userExists ? userExists.cnic || userExists.phoneNumber : familyCnicExists ? cnic : null
            });
        }

        // Step 3: Update logic for individual users
        if (userType === 'individual') {
            // Update the individual user details
            await UserModel.updateOne({ _id: userId }, newData);
        }

        // Step 4: Update logic for family users
        if (userType === 'family') {
            // Update the user's primary details in UserModel
            await UserModel.updateOne({ _id: userId }, {
                firstName: newData.firstName,
                lastName: newData.lastName,
                phoneNumber: newData.phoneNumber,
                email: newData.email,
                cnic: newData.cnic,
                age: newData.age,
                bloodGroup: newData.bloodGroup,
                province: newData.province,
                city: newData.city,
                district: newData.district,
                pinCode: newData.pinCode,
                lastDonationMonth: newData.lastDonationMonth,
                lastDonationYear: newData.lastDonationYear,
                userType: 'family'
            });

            // Update family members in the Family collection
            await Family.updateOne(
                { primaryUserId: userId },
                { familyMembers: newData.familyMembers }
            );
        }

        // Step 5: Return success response if the update was successful
        return res.status(200).json({ message: 'User updated successfully!' });

    } catch (err) {
        // Catch any other errors that might occur and send a generic server error message
        return res.status(500).json({ message: 'Server Error', error: err.message });
    }
}

export async function generateOTP(req, res) {
    try {
        const OTP = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });

        req.app.locals.OTP = OTP;
        req.app.locals.OTP_Expiry = Date.now() + 1 * 60 * 1000;

        res.status(201).send({ OTP: OTP });
    } catch (err) {
        res.status(401).send(err);
    }
}

export async function verifyOTP(req, res) {
    try {
        const { otp } = req.query;
        const generatedOTP = req.app.locals.OTP;
        const OTP_Expiry = req.app.locals.OTP_Expiry;

        // Check if OTP exists and is still valid
        if (!generatedOTP || !OTP_Expiry || Date.now() > OTP_Expiry) {
            return res.status(400).send({ error: 'OTP expired or invalid' });
        }

        if (parseInt(otp) === parseInt(generatedOTP)) {
            req.app.locals.OTP = null; // Resets the OTP
            req.app.locals.OTP_Expiry = null;
            req.app.locals.resetSession = true; // Starts the password reset session
            return res.status(201).send({ msg: 'OTP Verified Successfully' });
        } else {
            return res.status(400).send({ error: 'Invalid OTP' });
        }
    } catch (err) {
        res.status(401).send(err);
    }
}

export async function createResetSession(req, res) {
    try {
        if (req.app.locals.resetSession) {
            return res.status(201).send({ msg: 'Access granted!', flag: req.app.locals.resetSession });
        } else {
            return res.status(440).send({ error: 'Session expired!' });
        }
    } catch (err) {
        res.status(401).send(err);
    }
}

export async function resetPassword(req, res) {
    if (!req.app.locals.resetSession) return res.status(440).send({ error: 'Session expired!' });

    try {
        const { email, password } = req.body;

        // Find user by email
        UserModel.findOne({ email })
            .then((data) => {
                if (!data) {
                    return res.status(404).send({ error: 'User Not Found' });
                }

                // Compare new password with the current hashed password
                bcrypt.compare(password, data.password)
                    .then((isMatch) => {
                        if (isMatch) {
                            return res.status(400).send({ error: 'New password cannot be the same as the old password' });
                        }

                        // If the new password is different, proceed with password hashing and update
                        hashPassword(password)
                            .then((hashedPassword) => {
                                UserModel.updateOne({ email: data.email }, { password: hashedPassword })
                                    .then(() => {
                                        req.app.locals.resetSession = false;
                                        res.status(201).send({ msg: 'Password Updated Successfully' });
                                    })
                                    .catch(() => res.status(500).send({ error: 'Password Updation Failed' }));
                            })
                            .catch((err) => res.status(500).send(err));
                    })
                    .catch((err) => res.status(500).send({ error: 'Error comparing passwords' }));
            })
            .catch((err) => res.status(404).send({ error: 'User Not Found' }));
    } catch (err) {
        res.status(401).send(err);
    }
}

export async function requestblood(req, res) {
    try {
        const {
            email,
            patientName,
            bloodGroup,
            units,
            weight,
            antibodies,
            specialRequirements,
            medicalReason,
            otherMedicalReason,
            urgency,
            bloodComponentType,
            allergiesAndReactions,
            hospital = [{}], // Default to empty object array if not provided
            transfusionDateTime
        } = req.body;

        // Validation for 'Other' medical reason
        if (medicalReason === 'Other' && !otherMedicalReason) {
            return res.status(400).json({ error: 'Please provide a medical reason under "Other"' });
        }

        const newRequest = new Request({
            email,
            patientName,
            bloodGroup,
            units,
            weight,
            antibodies,
            specialRequirements: specialRequirements || ['None'],
            medicalReason,
            otherMedicalReason,
            urgency,
            bloodComponentType,
            allergiesAndReactions,
            hospital: {
                hospitalname: hospital[0]?.hospitalName || '', // Access as array element
                department: hospital[0]?.department || '',
                patientId: hospital[0]?.patientId || ''
            },
            transfusionDateTime,
        });

        await newRequest.save();

        return res.status(201).json({
            message: 'Blood request created successfully',
            request: newRequest
        });
    } catch (error) {
        console.error('Error creating blood request:', error);
        return res.status(500).json({ error: 'An error occurred while creating the blood request' });
    }
}

export async function notifyUsersOfBloodRequest(req, res) {
    try {
        // Fetch all user emails
        const users = await User.find({}, 'email');
        const allEmails = users.map(user => user.email);

        // Define email subject and message
        const subject = "Urgent Blood Donation Request";
        const requestDetails = req.body; // Include relevant request details
        const message = `A blood request has been made. Details: ${JSON.stringify(requestDetails)}`;

        // Send email to each user (consider batch sending for larger user bases)
        await Promise.all(
            allEmails.map(email =>
                sendEmail(email, subject, message).catch(err => {
                    console.log(`Failed to send email to ${email}:`, err);
                })
            )
        );

        res.status(200).json({ message: 'Blood request created and notifications sent to all users.' });
    } catch (error) {
        console.error('Error notifying users:', error);
        res.status(500).json({ message: 'Failed to send blood request notifications.' });
    }
}

export async function sendBloodRequestEmails(req, res) {
    try {
        // Get all user emails except the excluded one
        const allEmails = req.body

        // Define email subject and message
        const subject = "Urgent Blood Donation Request";
        const message = `A blood request has been made. Details: ${JSON.stringify(requestDetails)}`;

        // Send the email to each address in the list
        allEmails.forEach(email => {
            sendEmail(email, subject, message)
                .catch(err => console.log(`Failed to send email to ${email}:`, err));
        });

        console.log("Blood request emails sent successfully.");
    } catch (error) {
        console.error("Error sending blood request emails:", error);
        throw new Error("Failed to send blood request emails.");
    }
}

export async function getAllUserEmails(req, res) {
    try {
        const { email } = req.params; // Extract the email to exclude from the request parameters

        // Fetch both emails and first names, excluding the specified email
        const users = await UserModel.find({ email: { $ne: email } }, 'email firstName');

        // Map the result to extract emails and first names
        const userDetails = users.map(user => ({
            email: user.email,
            firstName: user.firstName
        }));

        res.status(200).json({ users: userDetails }); // Send the emails and first names as JSON response
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Failed to retrieve user details.' });
    }
}

// While This API is getting the info to show the user about the blood request based on email
export async function getbloodrequestinfo(req, res) {
    try {
        const { email } = req.params;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Fetch blood requests made by the user
        const requests = await Request.find({ email }).select('-createdAt -updatedAt -email -__v');

        if (!requests || requests.length === 0) {
            return res.status(404).json({ message: 'No blood request has been made with this email.' });
        }

        // Extract request IDs
        const requestIds = requests.map(request => request.id);

        console.log('Request IDs:', requestIds);

        // Fetch associated request status data
        const requestStatusList = await RequestStatus.find({
            requestId: { $in: requestIds }
        });

        console.log('Request Status List:', requestStatusList);

        // Merge request data with their status details
        const responseData = requests.map(request => {
            const requestStatus = requestStatusList.find(rs => String(rs.requestId) === String(request.id));

            const donorsFoundCount = requestStatus?.donors?.filter(d => d.status === 'Interested').length || 0;
            const underScreeningCount = requestStatus?.donors?.filter(d => d.status === 'Under Screening').length || 0;
            const completedCount = requestStatus?.donors?.filter(d => d.status === 'Completed').length || 0;

            return {
                ...request._doc, // Include all request details
                donorStatus: `${donorsFoundCount} Donors Found - Awaiting Confirmation, ${underScreeningCount} Under Screening, ${completedCount} Completed - Blood Provided`
            };
        });

        return res.status(200).json({
            message: 'Blood request information retrieved successfully.',
            requests: responseData,
        });
    } catch (error) {
        console.error('Error fetching blood request info:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Used for the updation of a particular request by the user  and this API is getting that data based on id
export async function getsinglebloodrequestinfo(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        const requests = await Request.findOne({ id })
            .select('-createdAt -updatedAt -email -__v'); // Exclude fields

        if (!requests || requests.length === 0) {
            return res.status(404).json({ message: 'No blood request has been made with this email.' });
        }

        return res.status(200).json({
            message: 'Blood request information retrieved successfully.',
            requests,
        });
    } catch (error) {
        console.error('Error fetching blood request info:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// export async function getAllPendingBloodRequests(req, res) {
//     try {

//         const pendingRequests = await Request.find({ status: 'Pending' });
//         if (!pendingRequests || pendingRequests.length === 0) {
//             return res.status(404).json({ message: 'No pending blood requests found.' });
//         }

//         const responseData = pendingRequests.map(request => ({
//             bloodGroup: request.bloodGroup,
//             units: request.units,
//             urgency: request.urgency,
//             medicalReason: request.medicalReason,
//             antibodies: request.antibodies,
//             hospitalName: request.hospital?.hospitalname || 'N/A',
//             department: request.hospital?.department || 'N/A',
//             transfusionDateTime: request.transfusionDateTime,
//             specialRequirements: request.specialRequirements,
//         }));

//         // Send the filtered pending request data
//         return res.status(200).json({
//             message: 'Pending blood requests retrieved successfully.',
//             requests: responseData,
//         });
//     } catch (error) {
//         console.error('Error fetching pending blood requests:', error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

export async function getAllPendingBloodRequests(req, res) {
    try {
        const pendingRequests = await Request.find({ status: 'Pending' });

        if (!pendingRequests || pendingRequests.length === 0) {
            return res.status(404).json({ message: 'No pending blood requests found.' });
        }

        // Fetch associated request status data
        const requestStatusList = await RequestStatus.find({
            requestId: { $in: pendingRequests.map(req => req.id) }
        });

        console.log('Request Status List:', requestStatusList);

        const responseData = pendingRequests.map(request => {
            // Find the corresponding status record
            const requestStatus = requestStatusList.find(rs => String(rs.requestId) === String(request.id));

            // Count donors in each stage
            const donorsFoundCount = requestStatus?.donors?.filter(d => d.status === 'Interested').length || 0;
            const underScreeningCount = requestStatus?.donors?.filter(d => d.status === 'Under Screening').length || 0;
            const completedCount = requestStatus?.donors?.filter(d => d.status === 'Completed').length || 0;

            return {
                bloodGroup: request.bloodGroup,
                units: request.units,
                urgency: request.urgency,
                medicalReason: request.medicalReason,
                antibodies: request.antibodies,
                hospitalName: request.hospital?.hospitalname || 'N/A',
                department: request.hospital?.department || 'N/A',
                transfusionDateTime: request.transfusionDateTime,
                specialRequirements: request.specialRequirements,
                donorStatus: `${donorsFoundCount} Donors Found - Awaiting Confirmation, ${underScreeningCount} Under Screening, ${completedCount} Completed - Blood Provided`
            };
        });

        return res.status(200).json({
            message: 'Pending blood requests retrieved successfully.',
            requests: responseData,
        });
    } catch (error) {
        console.error('Error fetching pending blood requests:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function deletebloodrequest(req, res) {
    try {
        const { id } = req.params;
        const bloodRequest = await Request.findOne({ id });

        if (!bloodRequest) {
            return res.status(404).json({ error: 'Blood request not found' });
        }

        if (bloodRequest.status !== 'Pending') {
            return res.status(400).json({
                error: 'Only requests with status "Pending" can be deleted'
            });
        }

        await Request.deleteOne({ id });

        return res.status(200).json({ message: 'Blood request deleted successfully' });
    } catch (error) {
        console.error('Error deleting blood request:', error);
        return res.status(500).json({ error: 'An error occurred while deleting the blood request' });
    }
}

export async function updatebloodrequest(req, res) {
    try {
        const { id } = req.params; // Assuming the request ID is passed as a route parameter
        const updates = req.body; // Fields to update

        // Validation for 'Other' medical reason
        if (updates.medicalReason === 'Other' && !updates.otherMedicalReason) {
            return res.status(400).json({ error: 'Please provide a medical reason under "Other"' });
        }

        // Find the blood request by ID
        const bloodRequest = await Request.findOne({ id });
        if (!bloodRequest) {
            return res.status(404).json({ error: 'Blood request not found' });
        }

        // Update the fields that are provided in the request body
        Object.keys(updates).forEach((key) => {
            // Special handling for nested objects like hospital
            if (key === 'hospital' && Array.isArray(updates.hospital)) {
                bloodRequest.hospital.hospitalname = updates.hospital[0]?.hospitalName || bloodRequest.hospital.hospitalname;
                bloodRequest.hospital.department = updates.hospital[0]?.department || bloodRequest.hospital.department;
                bloodRequest.hospital.patientId = updates.hospital[0]?.patientId || bloodRequest.hospital.patientId;
            } else {
                bloodRequest[key] = updates[key];
            }
        });

        // Save the updated blood request
        const updatedRequest = await bloodRequest.save();

        return res.status(200).json({
            message: 'Blood request updated successfully',
            request: updatedRequest
        });
    } catch (error) {
        console.error('Error updating blood request:', error);
        return res.status(500).json({ error: 'An error occurred while updating the blood request' });
    }
}

export async function registerbloodbank(req, res) {
    try {
        // Extract data from the request body
        const {
            name,
            address,
            city,
            state,
            latitude,
            longitude,
            phoneNumber,
            contactEmail,
            bloodBankCode, // Custom code provided by the user
        } = req.body;

        // Validate required fields
        if (
            !name ||
            !latitude ||
            !longitude ||
            !phoneNumber ||
            !contactEmail ||
            !bloodBankCode
        ) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: name, latitude, longitude, phoneNumber, contactEmail, and bloodBankCode are mandatory.",
            });
        }

        // Check if contactEmail is unique
        const existingBloodBank = await BloodBank.findOne({ contactEmail });
        if (existingBloodBank) {
            return res.status(400).json({
                success: false,
                message: `A blood bank with the email ${contactEmail} already exists.`,
            });
        }

        // Check if bloodBankCode is unique
        const existingBloodBankCode = await BloodBank.findOne({ bloodBankCode });
        if (existingBloodBankCode) {
            return res.status(400).json({
                success: false,
                message: `A blood bank with the code ${bloodBankCode} already exists.`,
            });
        }

        // Create a new BloodBank document
        const bloodBank = new BloodBank({
            name,
            address,
            city,
            state,
            latitude,
            longitude,
            phoneNumber,
            contactEmail,
            bloodBankCode,
        });

        // Save the blood bank to the database
        const savedBloodBank = await bloodBank.save();

        // Respond with the saved data, including the generated bloodBankId
        return res.status(201).json({
            success: true,
            message: "Blood bank registered successfully!",
            data: savedBloodBank,
        });
    } catch (error) {
        console.error("Error registering blood bank:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while registering the blood bank.",
            error: error.message,
        });
    }
}

export async function getbloodbank(req, res) {
    try {
        // Fetch all blood banks and select only specific fields to return
        const bloodBanks = await BloodBank.find({}, "name address city state bloodBankId phoneNumber contactEmail latitude longitude");

        // Check if any blood banks exist
        if (!bloodBanks || bloodBanks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No blood banks found.",
            });
        }

        // Respond with just the data array (simplified for the frontend)
        return res.status(200).json(bloodBanks);
    } catch (error) {
        console.error("Error fetching blood banks:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching blood banks.",
            error: error.message,
        });
    }
}

export async function setBloodBankAppointmentSchedule(req, res) {
    try {
        const { bloodBankCode, schedule } = req.body;

        // Validate required fields
        if (!bloodBankCode || !schedule) {
            return res.status(400).json({
                success: false,
                message: "BloodBankCode and schedule are required.",
            });
        }

        // Validate bloodBankCode format
        if (!/^[A-Z]{2}\d+$/.test(bloodBankCode)) {
            return res.status(400).json({
                success: false,
                message: "Invalid blood bank code. Format must be like BB1, HB4, etc.",
            });
        }

        // Check if the blood bank exists
        const bloodBankExists = await BloodBank.findOne({ bloodBankId: bloodBankCode });
        if (!bloodBankExists) {
            return res.status(404).json({
                success: false,
                message: "Blood bank with the provided code does not exist.",
            });
        }

        // Process schedule to create one-hour slots with divided appointments
        const processedSchedule = schedule.map(({ day, timeSlots }) => ({
            day,
            timeSlots: timeSlots.flatMap(({ startTime, endTime, maxAppointments, bookedAppointments = 0 }) => {
                const startHour = parseInt(startTime.split(":")[0]);
                const endHour = parseInt(endTime.split(":")[0]);
                const totalSlots = endHour - startHour;

                if (totalSlots <= 0) {
                    throw new Error("Invalid time range: End time must be after start time.");
                }

                const baseAppointments = Math.floor(maxAppointments / totalSlots);
                let remainder = maxAppointments % totalSlots;

                // Generate 1-hour slots
                return Array.from({ length: totalSlots }, (_, i) => {
                    const slotStart = startHour + i;
                    const slotEnd = slotStart + 1;
                    const slotAppointments = baseAppointments + (remainder > 0 ? 1 : 0);
                    if (remainder > 0) remainder--;

                    return {
                        startTime: `${String(slotStart).padStart(2, "0")}:00`,
                        endTime: `${String(slotEnd).padStart(2, "0")}:00`,
                        maxAppointments: slotAppointments,
                        bookedAppointments: Math.min(slotAppointments, bookedAppointments), // Prevent overbooking
                    };
                });
            }),
        }));

        const availability = await Availability.findOneAndUpdate(
            { bloodBankCode }, // Find by bloodBankCode
            { bloodBankCode, schedule: processedSchedule }, // Save processed schedule
            {
                upsert: true, // Insert if not found
                new: true, // Return the updated or created document
                runValidators: true, // Validate schema rules
            }
        );

        return res.status(200).json({
            success: true,
            message: "Blood bank availability registered successfully.",
            data: availability,
        });

    } catch (error) {
        console.error("Error in appointmentavailblity:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
}

export async function getappointmentschedule(req, res) {
    try {
        const { bloodBankCode, day } = req.query;

        // Validate required parameters
        if (!bloodBankCode || !day) {
            return res.status(400).json({
                success: false,
                message: "BloodBankCode and day are required.",
            });
        }

        // Validate bloodBankCode format
        if (!/^[A-Z]{2}\d+$/.test(bloodBankCode)) {
            return res.status(400).json({
                success: false,
                message: "Invalid blood bank code. Format must be like BB1, HB4, etc.",
            });
        }

        // Validate day
        const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        if (!validDays.includes(day)) {
            return res.status(400).json({
                success: false,
                message: "Invalid day. It must be a valid weekday.",
            });
        }

        // Find availability with matching bloodBankCode and day
        const availability = await Availability.findOne({ bloodBankCode });

        if (!availability) {
            return res.status(404).json({
                success: false,
                message: "No availability found for the provided blood bank.",
            });
        }

        // Find the schedule for the requested day
        const daySchedule = availability.schedule.find((d) => d.day === day);

        if (!daySchedule) {
            return res.status(404).json({
                success: false,
                message: "No schedule found for the specified day.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Availability details retrieved successfully.",
            data: { timeSlots: daySchedule.timeSlots },
        });
    } catch (error) {
        console.error("Error in getappointmentschedule:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
}

export async function bookappointment(req, res) {
    try {
        const {
            firstName,
            email,
            phoneNumber,
            bloodBankName,
            bloodBankId,
            timeslot,
            date,
            day,
        } = req.body;

        if (!firstName || !email || !phoneNumber || !bloodBankName || !bloodBankId || !timeslot || !date || !day) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if there is an existing appointment with the same email and status is null
        const existingAppointment = await Appointment.findOne({ email });
        if (existingAppointment && existingAppointment.status === null) {
            return res.status(400).json({
                message: 'An appointment already exists for this email with a pending status.'
            });
        }

        // Find the availability for the specific blood bank and day
        const availability = await Availability.findOne({ bloodBankCode: bloodBankId });
        if (!availability) {
            return res.status(404).json({
                message: 'No availability found for the provided blood bank.',
            });
        }

        // Find the schedule for the requested day
        const daySchedule = availability.schedule.find((d) => d.day === day);
        if (!daySchedule) {
            return res.status(404).json({
                message: 'No schedule found for the specified day.',
            });
        }

        // Find the specific timeslot
        const timeSlot = daySchedule.timeSlots.find((slot) => `${slot.startTime}-${slot.endTime}` === timeslot);
        if (!timeSlot) {
            return res.status(404).json({
                message: 'No timeslot found for the specified time.',
            });
        }

        // Check if there are available appointments
        if (timeSlot.maxAppointments <= timeSlot.bookedAppointments) {
            return res.status(400).json({
                message: 'No available appointments for the specified timeslot.',
            });
        }

        // Create a new appointment
        const newAppointment = new Appointment({
            firstName,
            email,
            phoneNumber,
            bloodBankName,
            bloodBankId,
            timeslot,
            date,
            day,
        });

        await newAppointment.save();

        // Update the availability
        timeSlot.bookedAppointments += 1;
        timeSlot.maxAppointments -= 1;
        await availability.save();

        return res.status(201).json({
            message: 'Appointment booked successfully',
            appointment: newAppointment,
        });
    } catch (error) {
        console.error('Error booking appointment:', error);
        return res.status(500).json({ message: 'Failed to book appointment', error: error.message });
    }
}

// export async function bookappointment(req, res) {
//     try {
//         const {
//             firstName,
//             email,
//             phoneNumber,
//             bloodBankName,
//             bloodBankId,
//             timeslot,
//             date,
//             day,
//         } = req.body;

//         if (!firstName || !email || !phoneNumber || !bloodBankName || !bloodBankId || !timeslot || !date || !day) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }

//         // Check if there is an existing appointment with the same email and status is null
//         // const existingAppointment = await Appointment.findOne({ email });
//         // if (existingAppointment && existingAppointment.status === null) {
//         //     return res.status(400).json({
//         //         message: 'An appointment already exists for this email with a pending status.'
//         //     });
//         // }

//         // Find the availability for the specific blood bank, day, and timeslot
//         // const availability = await Availability.findOne({
//         //     bloodBankId,
//         //     day,
//         //     "timeSlots.startTime": timeslot.split('-')[0] // Match based on the starting time of the slot
//         // });

//         // if (!availability) {
//         //     return res.status(404).json({ message: 'Availability not found for the selected time slot' });
//         // }

//         // Find the specific time slot in the availability document
//         const timeSlotIndex = Availability.timeSlots.findIndex(slot => slot.startTime === timeslot.split('-')[0]);

//         if (timeSlotIndex === -1) {
//             return res.status(404).json({ message: 'Time slot not found' });
//         }

//         if (Availability.timeSlots[timeSlotIndex].availableAppointments <= 0) {
//             return res.status(400).json({ message: 'No available appointments for this slot' });
//         }

//         // Decrease availableAppointments and increase bookedAppointments
//         Availability.timeSlots[timeSlotIndex].availableAppointments -= 1;
//         Availability.timeSlots[timeSlotIndex].bookedAppointments += 1;

//         // Save the updated availability
//         await Availability.save();

//         // Create a new appointment
//         const newAppointment = new Appointment({
//             firstName,
//             email,
//             phoneNumber,
//             bloodBankName,
//             bloodBankId,
//             timeslot,
//             date,
//             day,
//         });

//         await newAppointment.save();

//         return res.status(201).json({
//             message: 'Appointment booked successfully',
//             appointment: newAppointment,
//         });
//     } catch (error) {
//         console.error('Error booking appointment:', error);
//         return res.status(500).json({ message: 'Failed to book appointment', error: error.message });
//     }
// }

export async function getappointmentdetails(req, res) {
    try {
        const { email } = req.params;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const appointments = await Appointment.find({ email })
            .select('-__v -createdAt -updatedAt -_id -phoneNumber -bloodBankId');

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for this email.' });
        }
        return res.status(200).json({
            appointments
        });
    } catch (error) {
        console.error('Error fetching appointment details:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getappointmentdetailsbybloodbank(req, res) {
    try {
        const { bloodBankId } = req.params; // Ensure `bloodBankId` is retrieved from `params`
        if (!bloodBankId) {
            return res.status(400).json({ error: 'Blood Bank ID is required' });
        }

        // Query to find appointments with matching bloodBankId and status null
        const appointments = await Appointment.find({
            bloodBankId,
            status: null // Fetch only appointments where status is null
        })
            .select('-__v -createdAt -updatedAt -_id -bloodBankId'); // Exclude sensitive fields

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for your Blood Bank' });
        }

        return res.status(200).json({
            appointments,
        });
    } catch (error) {
        console.error('Error fetching appointment details:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function updateAppointmentStatus(req, res) {
    try {
        const { email, status } = req.body;

        if (!email || !status) {
            return res.status(400).json({ error: 'Email and status are required.' });
        }

        const validStatuses = ['Appear', 'Not-Appear', null];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status value. Allowed values are "Appear", "Not-Appear", or null.' });
        }

        const updatedAppointment = await Appointment.findOneAndUpdate(
            { email },
            { status },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ error: 'Appointment not found for the provided email.' });
        }

        res.status(200).json({
            message: 'Appointment status updated successfully.',
            appointment: updatedAppointment,
        });
    } catch (error) {
        console.error('Error updating appointment status:', error);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
}

export async function addinventory(req, res) {
    try {
        const { bloodBankId, bloodBankName, inventory } = req.body;

        // Validate the input
        if (!bloodBankId || !bloodBankName || !Array.isArray(inventory)) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        // Check if the bloodBankId exists in the BloodBank database
        const bloodBank = await BloodBank.findOne({ bloodBankId });
        if (!bloodBank) {
            return res.status(404).json({ message: "Blood bank not found" });
        }

        // Check if the inventory already exists for the bloodBankId
        const existingInventory = await Inventory.findOne({ bloodBankId });

        if (existingInventory) {
            // Update existing inventory
            existingInventory.inventory = inventory;
            await existingInventory.save();

            return res.status(200).json({
                message: "Inventory updated successfully",
                data: existingInventory,
            });
        } else {
            // Create a new inventory record
            const newInventory = new Inventory({
                bloodBankName,
                bloodBankId,
                inventory,
            });

            await newInventory.save();

            return res.status(201).json({
                message: "Inventory added successfully",
                data: newInventory,
            });
        }
    } catch (error) {
        console.error("Error handling inventory:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

export async function getinventory(req, res) {
    try {
        const { bloodBankId } = req.params;

        // Validate bloodBankId
        if (!bloodBankId) {
            return res.status(400).json({ message: "Blood bank ID is required" });
        }

        // Fetch inventory for the given bloodBankId
        const inventory = await Inventory.findOne({ bloodBankId });

        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found for the specified blood bank" });
        }

        return res.status(200).json({
            message: "Inventory retrieved successfully",
            data: inventory,
        });
    } catch (error) {
        console.error("Error fetching inventory:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

export async function addcampaign(req, res) {
    try {
        const { bloodBankId, bloodBankName, startDateTime, endDateTime, venue, contactDetails } = req.body;

        const bloodBank = await BloodBank.findOne({ bloodBankId });
        if (!bloodBank) {
            return res.status(404).json({
                success: false,
                message: 'Blood Bank not found. Please provide a valid bloodBankId.',
            });
        }

        if (bloodBank.name !== bloodBankName) {
            return res.status(400).json({
                success: false,
                message: 'The blood bank name does not match the provided bloodBankId.',
            });
        }

        const existingCampaign = await BloodCampaign.findOne({
            bloodBankId,
            'venue.name': venue.name,
            'venue.street': venue.street,
            'venue.city': venue.city,
            'venue.state': venue.state,
            startDateTime,
        });

        if (existingCampaign) {
            existingCampaign.endDateTime = endDateTime;
            existingCampaign.contactDetails = contactDetails;

            await existingCampaign.save();

            return res.status(200).json({
                success: true,
                message: 'Existing campaign updated successfully!',
                campaign: existingCampaign,
            });
        }

        const campaignWithSameVenue = await BloodCampaign.findOne({
            bloodBankId,
            'venue.name': venue.name,
            'venue.street': venue.street,
            'venue.city': venue.city,
            'venue.state': venue.state,
        });

        if (campaignWithSameVenue) {
            console.log('A campaign with the same venue but different startDateTime exists. Creating a new campaign.');
        }

        if (new Date(startDateTime) <= new Date()) {
            return res.status(400).json({
                success: false,
                message: 'Start date and time must be in the future.',
            });
        }

        if (new Date(endDateTime) <= new Date(startDateTime)) {
            return res.status(400).json({
                success: false,
                message: 'End date and time must be later than start date and time.',
            });
        }

        const newCampaign = new BloodCampaign({
            bloodBankId,
            bloodBankName,
            startDateTime,
            endDateTime,
            venue,
            contactDetails,
        });

        const savedCampaign = await newCampaign.save();

        return res.status(201).json({
            success: true,
            message: 'Blood campaign created successfully!',
            campaign: savedCampaign,
        });
    } catch (error) {
        console.error('Error creating or updating blood campaign:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while processing the blood campaign.',
            error: error.message,
        });
    }
}

export async function getCampaign(req, res) {
    try {
        // Retrieve all campaigns
        const campaigns = await BloodCampaign.find();

        // Check if campaigns exist
        if (!campaigns || campaigns.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No campaigns found.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Campaigns retrieved successfully.',
            campaigns,
        });
    } catch (error) {
        console.error('Error retrieving campaigns:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving campaigns.',
            error: error.message,
        });
    }
}

export async function deleteCampaign(req, res) {
    try {
        console.log(req.body);
        const { bloodBankId, bloodBankName, venue, startDateTime, endDateTime } = req.body;

        // Validate request input
        if (!bloodBankId || !bloodBankName || !venue || !startDateTime || !endDateTime) {
            return res.status(400).json({
                success: false,
                message: 'Please provide bloodBankId, bloodBankName, venue details, startDateTime, and endDateTime.',
            });
        }

        // Parse and validate date inputs
        const start = new Date(startDateTime);
        const end = new Date(endDateTime);
        if (isNaN(start) || isNaN(end)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid startDateTime or endDateTime. Please provide valid dates.',
            });
        }

        // Check if the campaign exists with the provided details
        const campaign = await BloodCampaign.findOne({
            bloodBankId,
            bloodBankName,
            'venue.name': venue.name,
            'venue.street': venue.street,
            'venue.city': venue.city,
            'venue.state': venue.state,
            startDateTime: start,
            endDateTime: end,
        });

        if (!campaign) {
            return res.status(404).json({
                success: false,
                message: 'Campaign not found. Please check the details and try again.',
            });
        }

        // Delete the campaign
        await BloodCampaign.deleteOne({ _id: campaign._id });

        res.status(200).json({
            success: true,
            message: 'Campaign deleted successfully.',
        });
    } catch (error) {
        console.error('Error deleting campaign:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the campaign.',
            error: error.message,
        });
    }
}

export async function getCampaignByBloodBank(req, res) {
    try {
        const { bloodBankId } = req.params;

        // Validate input
        if (!bloodBankId) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a bloodBankId.',
            });
        }

        // Find campaigns by bloodBankId
        const campaigns = await BloodCampaign.find({ bloodBankId });

        // Check if campaigns exist for the given bloodBankId
        if (!campaigns || campaigns.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No campaigns found for BloodBankId: ${bloodBankId}.`,
            });
        }

        res.status(200).json({
            success: true,
            message: 'Campaigns retrieved successfully for the specified blood bank.',
            campaigns,
        });
    } catch (error) {
        console.error('Error retrieving campaigns for blood bank:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving campaigns for the blood bank.',
            error: error.message,
        });
    }
}

export async function archivePastCampaigns() {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const currentDate = new Date();

        // Find past campaigns
        const pastCampaigns = await BloodCampaign.find({ endDateTime: { $lt: currentDate } }).session(session);

        if (pastCampaigns.length > 0) {
            console.log(`Found ${pastCampaigns.length} past campaigns. Archiving...`);


            await BloodCampaignV2.insertMany(pastCampaigns, { ordered: false });


            await BloodCampaign.deleteMany({ endDateTime: { $lt: currentDate } }).session(session);

            await session.commitTransaction();
            console.log(`Successfully archived ${pastCampaigns.length} past campaigns.`);
        } else {
            console.log('No past campaigns found to archive.');
        }
    } catch (error) {
        await session.abortTransaction(); // Rollback if any error occurs
        console.error('Error archiving campaigns:', error);
    } finally {
        session.endSession(); // Close session
    }
}

// For future currently done by running server as not in cloud server
// Schedule job to run every day at midnight (12:00 AM)
cron.schedule('0 0 * * *', () => {
    console.log('Running campaign archive job...');
    archivePastCampaigns();
});

export async function updateBloodRequestStatus(req, res) {
    try {
        const { requestId, donorEmail, status } = req.body;

        if (!requestId || !donorEmail || !status) {
            return res.status(400).json({ error: 'Request ID, donor email, and status are required.' });
        }

        const existingRequest = await Request.findOne({ id: requestId });
        if (!existingRequest) {
            return res.status(404).json({ error: 'Invalid request ID, request not found!' });
        }

        let requestStatus = await RequestStatus.findOne({ requestId });

        if (!requestStatus) {
            requestStatus = new RequestStatus({
                requestId,
                totalRequiredUnits: existingRequest.units,
                status: 'Waiting for Donors',
                donors: []
            });
        }

        requestStatus.donors = requestStatus.donors || [];

        // Define allowed status transitions
        const allowedTransitions = {
            "Interested": ["Under Screening"],
            "Under Screening": ["Completed"],
            "Completed": []
        };

        // Count the number of donors in each status
        const completedCount = requestStatus.donors.filter(d => d.status === "Completed").length;
        const screeningCount = requestStatus.donors.filter(d => d.status === "Under Screening").length;
        const interestedCount = requestStatus.donors.filter(d => d.status === "Interested").length;

        const remainingNeeded = requestStatus.totalRequiredUnits - completedCount;

        // Remove all "Interested" donors if "Under Screening" reaches the needed units
        if (screeningCount >= remainingNeeded) {
            requestStatus.donors = requestStatus.donors.filter(d => d.status !== "Interested");

            // If the new donor is trying to become "Interested", reject the request
            if (status === "Interested") {
                return res.status(400).json({ error: 'No more donors can be added as "Interested" since required units are being screened.' });
            }
        }

        const donorIndex = requestStatus.donors.findIndex(donor => donor.donorEmail === donorEmail);

        if (donorIndex !== -1) {
            // Check if the transition is valid
            const currentStatus = requestStatus.donors[donorIndex].status;
            if (!allowedTransitions[currentStatus].includes(status)) {
                return res.status(400).json({
                    error: `Invalid status transition from ${currentStatus} to ${status}. Allowed: ${allowedTransitions[currentStatus].join(", ")}`
                });
            }
            requestStatus.donors[donorIndex].status = status;
        } else {
            // New donor can only start with "Interested"
            if (status !== "Interested") {
                return res.status(400).json({ error: 'New donors must start with "Interested" status.' });
            }
            requestStatus.donors.push({ donorEmail, status });
        }

        await requestStatus.save();

        // Extract requestor email from existing request
        const requestorEmail = existingRequest.email;

        // Send email to donor
        const emailDataForDonor = {
            userEmail: donorEmail,
            subject: "Blood Safe Life - Update on Your Donation Status",
            mailType: "UpdateRequestStatusSendingToDonor",
            status: requestStatus,
            username: donorEmail.split('@')[0],
        };
        await axios.post('http://localhost:8080/api/send-mail', emailDataForDonor);

        // Send email to requestor
        const emailDataForRequestor = {
            userEmail: requestorEmail, // Requestor's email
            subject: "Blood Safe Life - Update on Your Blood Request",
            mailType: "UpdateRequestStatusSendingToRequestor",
            status: requestStatus,
            username: requestorEmail.split('@')[0],
        };
        await axios.post('http://localhost:8080/api/send-mail', emailDataForRequestor);

        return res.status(200).json({
            message: `Status updated to ${status} successfully`,
            status: requestStatus
        });

    } catch (error) {
        console.error('Error updating request status:', error);
        return res.status(500).json({ error: 'An error occurred while updating the request status' });
    }
}

export async function getInterestedDonorData(req, res) {
    try {
        // Fetch all blood requests from the Request table
        const allRequests = await Request.find();

        if (!allRequests || allRequests.length === 0) {
            return res.status(200).json({ success: true, message: 'No blood requests found!', data: [] });
        }

        // Fetch all request statuses from the RequestStatus table
        const allRequestStatuses = await RequestStatus.find();

        // Create a map for quick lookup of request statuses
        const requestStatusMap = new Map();
        allRequestStatuses.forEach(status => {
            requestStatusMap.set(status.requestId, status.donors || []);
        });

        // Format response with request details and only interested donors
        const responseData = allRequests.map(request => {
            const donors = requestStatusMap.get(request.id) || [];
            const interestedDonors = donors.filter(donor => donor.status === "Interested");

            return {
                requestId: request.id,
                requestedUser: {
                    name: request.name,
                    email: request.email,
                    phoneNumber: request.phoneNumber,
                    bloodGroup: request.bloodGroup,
                    hospital: request.hospital,
                    urgency: request.urgency,
                    totalRequiredUnits: request.units
                },
                interestedDonors: interestedDonors.map(donor => ({
                    donorEmail: donor.donorEmail,
                    status: donor.status
                }))
            };
        });

        return res.status(200).json({
            success: true,
            data: responseData
        });

    } catch (error) {
        console.error('Error fetching all blood bank data:', error);
        return res.status(500).json({ error: 'An error occurred while fetching blood bank data' });
    }
}

export async function getInterestedSingleDonorData(req, res) {
    try {
        const { requestId } = req.params;

        if (!requestId) {
            return res.status(400).json({ error: 'Request ID is required.' });
        }

        // Fetch the requested user's details from the Request table
        const requestedUser = await Request.findOne({ id: requestId });

        if (!requestedUser) {
            return res.status(404).json({ error: 'Request not found!' });
        }

        // Fetch interested donors from the RequestStatus table
        // const requestStatus = await RequestStatus.findOne({ where: { requestId } });

        const requestStatus = await RequestStatus.find({
            requestId: { $in: requestId }
        });

        const interestedDonors = requestStatus
            .flatMap(status => status.donors) // Flatten all donors from different requests
            .filter(donor => donor.status === 'Interested'); // Keep only 'Interested' donors


        return res.status(200).json({
            success: true,
            requestedUser: {
                id: requestedUser.id,
                name: requestedUser.name,
                email: requestedUser.email,
                phoneNumber: requestedUser.phoneNumber,
                bloodGroup: requestedUser.bloodGroup,
                hospital: requestedUser.hospital,
                urgency: requestedUser.urgency,
                totalRequiredUnits: requestedUser.totalRequiredUnits  // Ensure correct field name
            },
            interestedDonors: interestedDonors.map(donor => ({
                donorEmail: donor.donorEmail,
                status: donor.status
            }))
        });

    } catch (error) {
        console.error('Error fetching blood bank data:', error);
        return res.status(500).json({ error: 'An error occurred while fetching blood bank data' });
    }
}





