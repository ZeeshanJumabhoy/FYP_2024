import axios from 'axios';
import jwt_decode from 'jwt-decode';
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;
 
export async function getUsername() {
    const token = localStorage.getItem('token');
    if (!token) {
        return Promise.reject('Cannot find the Token...!');
    }
    const decodedToken = jwt_decode(token);
   // console.log(decodedToken);
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
    let email=username;
    try {
        let { data, status } = await axios.get(`/api/generate-otp`, { params: {email} });
        // Send OTP mail
        if (status === 201) {
            //let { email } = await getUser({ username });
            let username= "Blood Savior";
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

