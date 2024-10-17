import toast from 'react-hot-toast';

// Updated registerValidation function
export async function registerValidation(values) {
    const errors = {};
    firstNameVerify(errors, values);
    lastNameVerify(errors, values);
    phoneNumberVerify(errors, values);
    cnicVerify(errors, values);
    emailVerify(errors, values);
    ageVerify(errors, values);
    passwordVerify(errors, values, true); 
    bloodGroupVerify(errors, values);
    usernameVerif(errors, values);
    return errors;
}

function usernameVerif(error = {}, values) {
    const validRegex = /^[A-Za-z0-9_]+$/;

    if (!values.username) {
        error.username = toast.error('Username is required...!');
    } else if (!validRegex.test(values.username)) {
        toastWarn('Only alphanumeric characters and underscores are allowed in username');
        error.username = toast.error('Invalid Username...!');
    }
    return error;
}

// First Name Validation
function firstNameVerify(error = {}, values) {
    if (!values.firstName) {
        error.firstName = "First Name is required!";
        toast.error('First Name is required...!');
    }
    return error;
}
 
// Last Name Validation
function lastNameVerify(error = {}, values) {
    if (!values.lastName) {
        error.lastName = "Last Name is required!";
        toast.error('Last Name is required...!');
    }
    return error;
}

// Phone Number Validation
function phoneNumberVerify(error = {}, values) {  
    const phoneRegex = /^\+92 3\d{9}$/;
    if (!values.phoneNumber) {  
        error.phoneNumber = "Phone Number is required!";
        toast.error('Phone Number is required...!');  
    } else if (!phoneRegex.test(values.phoneNumber)) {  
        error.phoneNumber = "Invalid Phone Number!";
        toast.error('Invalid Phone Number...!');  
    }  
    return error;  
}

// Email Validation
function emailVerify(error = {}, values) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!values.email) {
        error.email = "Email is required!";
        toast.error('Email is Required...!');
    }
    return error;
}
// CNIC Validation
function cnicVerify(error = {}, values) {
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    if (!values.cnic) {
        error.cnic = "CNIC is required!";
        toast.error('CNIC is required...!');
    } else if (!cnicRegex.test(values.cnic)) {
        error.cnic = "Invalid CNIC format!";
        toast.error('Invalid CNIC format...!');
    }
    return error;
}

// Age Validation
function ageVerify(error = {}, values) {
    if (!values.age) {
        error.age = "Age is required!";
        toast.error('Age is required...!');
    } else if (isNaN(values.age) || values.age <= 0) {
        error.age = "Invalid Age!";
        toast.error('Invalid Age...!');
    }
    return error;
}

// Blood Group Validation
function bloodGroupVerify(error = {}, values) {
    const validBloodGroups = ['O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-'];
    if (!values.bloodGroup) {
        error.bloodGroup = "Blood Group is required!";
        toast.error('Blood Group is required...!');
    } else if (!validBloodGroups.includes(values.bloodGroup)) {
        error.bloodGroup = "Invalid Blood Group!";
        toast.error('Invalid Blood Group...!');
    }
    return error;
}

export async function useremailValidate(values) {
    const errors = usernameVerify({}, values);
    return errors;
}

export async function passwordValidate(values) {
    const errors = passwordVerify({}, values);
    return errors;
}

export async function resetPasswordValidation(values) {
    const errors = passwordVerify({}, values, true);
    return errors;
}

// Username Validation
function usernameVerify(error = {}, values) {
    const validRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!values.username) {
        error.username = "Email is required!";
        toast.error('Email is required...!');
    } else if (!validRegex.test(values.username)) {
        error.username = "Invalid Email!";
        toast.error('Invalid Email...!');
    }
    return error;
}

// Password Validation
function passwordVerify(errors = {}, values, confirm = false) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!values.password) {
        errors.password = "Password is required!";
        toast.error('Password is Required...!');
    } else if (values.password.includes(' ')) {
        errors.password = "Password cannot contain white spaces.";
        toast.error('Password cannot contain white spaces.');
    } else if (values.password.length < 8) {
        errors.password = "Password must be more than 8 characters long.";
        toast.error('Password must be more than 8 characters long.');
    } else if (!specialChars.test(values.password)) {
        errors.password = "Password must have special character.";
        toast.error('Password must have special character.');
    } else if (confirm && values.password !== values.confirm_password) {
        errors.confirm_password = "Passwords do not match!";
        toast.error('Password does not match...!');
    }
    return errors;
} 