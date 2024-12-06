import axios from 'axios';
import jwt_decode from 'jwt-decode';
import useFetch from '../hooks/fetch';
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export async function getUsername() {
    const token = localStorage.getItem('token');
    if (!token) {
        return Promise.reject('Cannot find the Token...!');
    }
    const decodedToken = jwt_decode(token);
    return decodedToken; // Return the extracted email
}
export async function authenticate(email) {
    try {
        const { status } = await axios.post('/api/authenticate', { email });
        if (status !== 200) {
            throw new Error({ message: 'Email not Found...!' });
        }
        return Promise.resolve({ message: 'Email found successfully.' });
    } catch (error) {
        return Promise.reject({ error });
    }
}
export async function login(credentials) {
    try {
        const { data } = await axios.post('http://localhost:8080/api/login', credentials);
        return Promise.resolve({ data });
    } catch (e) {
        return Promise.reject({ error: 'Login Failed...!', e });
    }
}

export async function registerverify(credentials) {
    try {
        const { status } = await axios.post('/api/registerCheck', credentials);
        // console.log(credentials)
        // redirects to OTP generation if corrects

        if (status === 201) {
            let message = 'Redirecting For Verification!';
            return Promise.resolve({ message });
        } else {
            throw new Error('Registration Failed...!');
        }
    } catch (err) {
        let message = err?.response?.data?.errors.join(', ') || "Something went wrong!";
        return Promise.reject({ err, message });
    }
}

export async function register(credentials) {
    try {
        const { status } = await axios.post('/api/register', credentials);
        // console.log(credentials)
        // Send Mail if user registered Successfully

        if (status === 201) {
            let message = 'Registered Successfully!';
            const mailData = {
                firstname: credentials.firstname,
                userEmail: credentials.email,
                subject: message,
                mailType: 'registerMail',
            };
            await axios.post('/api/send-mail', mailData);
            return Promise.resolve({ message });
        } else {
            throw new Error('Registration Failed...!');
        }
    } catch (err) {
        let message = err?.response?.data?.error;
        return Promise.reject({ err, message });
    }
}

/*export async function getUser({ username }) {
    try {
        let { data } = await axios.get(`/api/user/${username}`);
        return data;
    } catch (e) {
        return { error: "Couldn't Fetch the user data...!", e };
    }
}*/

export async function updateUser(credentials) {
    try {
        const token = await localStorage.getItem('token');
        const { data } = await axios.put('api/update-user', credentials, { headers: { Authorization: `Bearer ${token}` } });
        return Promise.resolve({ data });
    } catch (err) {
        let message = err?.response?.data?.error;
        return Promise.reject({ err, message });
    }
}

//change in this
export async function generateOTP(username) {
    let email = username;
    try {
        let { data, status } = await axios.get(`/api/generate-otp`, { params: { email } });
        // Send OTP mail
        if (status === 201) {
            //let { email } = await getUser({ username });
            let username = "Blood Savior";
            const mailData = {
                username: username,
                userEmail: email,
                subject: 'Password Recovery OTP',
                mailType: 'otpMail',
                otp: data?.OTP,
            };
            await axios.post('/api/send-mail', mailData);
        }

        return Promise.resolve(data?.OTP);
    } catch (e) {
        return Promise.reject({ error: "Couldn't genreate the OTP...!", e });
    }
}

export async function verifyOTP(credentials) {
    try {
        const { data, status } = await axios.get(`/api/verify-otp`, { params: credentials });
        return { data, status };
    } catch (e) {
        return Promise.reject({ error: 'OTP Verification Failed...!', e });
    }
}

export async function resetPassword(credentials) {
    try {
        const { data, status } = await axios.put('/api/reset-password', credentials);
        return Promise.resolve({ data, status });
    } catch (e) {
        // Capture the error message from the response
        const errorMessage = e.response?.data?.error || 'Password reset failed...!';
        return Promise.reject({ error: errorMessage });
    }
}

export async function requestblood(credentials) {
    try {
        const token = await localStorage.getItem('token');

        // Exclude firstName from credentials
        const { firstName, ...filteredCredentials } = credentials;

        const { status, data } = await axios.post('api/requestblood', filteredCredentials, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        if (status === 201) {
            let message = 'Your Blood Request is Underway – We are Here to Help';
            const mailData = {
                username: credentials.firstName, // Use firstName here if needed
                userEmail: credentials.email,
                subject: message,
                mailType: 'bloodrequest',
            };
            await axios.post('/api/send-mail', mailData);
            return Promise.resolve({ status });
        } else {
            throw new Error('Registration Failed...!');
        }

    } catch (err) {
        let message = err?.response?.data?.error;
        return Promise.reject({ err, message });
    }
}

export async function sendBloodRequestEmails(credentials) {
    try {
        // Fetch all user emails and first names
        const response = await axios.get(`/api/getAllUserEmails/${credentials.email}`);
        const users = response.data.users;

        // Iterate over each user and send the email
        const {
            bloodGroup,
            units,
            urgency,
            specialRequirements,
            medicalReason,
            transfusionDateTime,
            hospital
        } = credentials;

        const hospitalName = hospital[0]?.hospitalName || '';
        const emailDetails = {
            bloodGroup,
            units,
            urgency,
            specialRequirements: specialRequirements.length > 0 ? specialRequirements : ['None'],
            medicalReason,
            transfusionDateTime,
            hospitalName,// Get first hospital object if available
        };
        
        for (const user of users) {
            const mailData = {
                username: user.firstName, // Use the first name from the response
                userEmail: user.email,     // Use the email from the response
                subject: 'Urgent Blood Donation Request',
                mailType: 'interestbloodgiving',
                ...emailDetails,
            };

            // Send email to each user
            await axios.post('/api/send-mail', mailData);
        }
        
        console.log('Emails sent to all users successfully.');
    } catch (error) {
        console.error('Error sending emails:', error);
    }
}

export async function getBloodRequestById(id) {
    try {
        const { data } = await axios.get(`/api/getsinglebloodrequestinfo/${id}`);
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Failed to fetch blood request details!', details: error });
    }
}


export async function updateBloodRequest(id, updatedFields) {
    try {
        // Get the JWT token from localStorage
        const token = await localStorage.getItem('token');

        // Send the PUT request to update the blood request
        const { data } = await axios.put(
            `api/updatebloodrequest/${id}`, 
            updatedFields, 
            { headers: { Authorization: `Bearer ${token}` } }
        );

        // Resolve the promise with the API response
        return Promise.resolve({ data });
    } catch (err) {
        // Extract the error message if available
        let message = err?.response?.data?.error;
        return Promise.reject({ err, message });
    }
}

export async function getBloodBank() {
    try {
        const { data } = await axios.get(`/api/getbloodbank`);
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Failed to fetch blood request details!', details: error });
    }
}

export async function appointmentavailability(credentials) {
    try {

        // Make the API call to save the appointment availability
        const { status, data } = await axios.post("api/appointmentavailblity", credentials);

        if (status === 200 || status === 201) {
            console.log("Availability successfully registered:", data);

            return Promise.resolve({ status, message: "Schedule successfully submitted." });
        } else {
            throw new Error("Failed to submit schedule.");
        }
    } catch (err) {
        console.error("Error while submitting schedule:", err.message);

        // Extract a meaningful error message if available
        let message = err?.response?.data?.message || "An error occurred while submitting schedule.";
        return Promise.reject({ err, message });
    }
}


export async function getAppointmentSchedule({ bloodBankId, day }) {
    try {
        const bloodBankCode = bloodBankId;
        if (!bloodBankCode || !day) {
            throw new Error("BloodBankCode and day are required.");
        }
        const { data } = await axios.get(`/api/getappointmentdetails`, {
            params: { bloodBankCode, day },
        });
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({
            error: "Failed to fetch appointment schedule!",
            details: error?.response?.data || error.message,
        });
    }
}
