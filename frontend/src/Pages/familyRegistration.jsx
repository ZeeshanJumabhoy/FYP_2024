import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { Password } from 'primereact/password'; // Import Password from PrimeReact
import { registerValidation } from '../Helper/Validate';
import { register, registerverify } from '../Helper/helper';
import { provinceData, cityData, districtData } from '../Helper/location';
import '../Styles/card.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // Import PrimeReact CSS
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function Register() {
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [familyMembers, setFamilyMembers] = useState(0); // State to track number of family members

  // Format CNIC to XXXXX-XXXXXXX-X pattern
  const formatCNIC = (value) => {
    let cnic = value.replace(/\D/g, ''); // Remove all non-numeric characters
    if (cnic.length > 5) cnic = `${cnic.slice(0, 5)}-${cnic.slice(5)}`;
    if (cnic.length > 13) cnic = `${cnic.slice(0, 13)}-${cnic.slice(13, 14)}`;
    return cnic;
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      cnic: '',
      email: '',
      age: '',
      bloodGroup: '',
      username: '',
      password: '',
      confirm_password: '',
      province: '',
      city: '',
      district: '',
      pinCode: '',
      lastDonationMonth: '',
      lastDonationYear: '',
      userType: 'family',
      familyMembers: [],
      //familyMembers: Array(1).fill({ firstName: '', lastName: '', cnic: '', age: '' }), // Array for family members
    },

    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      const registerPromise = registerverify(values);
      console.log(values);

      toast.promise(registerPromise, {
        loading: "Creating...",
        success: (res) => {
          navigate('/verification', { state: { ...values } });
          return "Redirecting to Verification";
        },
        error: (err) => {
          return <b>{err.message || 'Could Not Register...!'}</b>;
        },
      });

      registerPromise.catch((err) => {
        toast.error(err.message || "Something went wrong!");
      });
    },
  });

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    formik.setFieldValue('province', e.target.value);
    setSelectedCity(''); // Reset city when province changes
    setSelectedDistrict(''); // Reset district when province changes
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    formik.setFieldValue('city', e.target.value);
    setSelectedDistrict(''); // Reset district when city changes
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    formik.setFieldValue('district', e.target.value);
  };

  /* const handleFamilyMemberChange = (e) => {
     const selectedFamilyMembers = Number(e.target.value);
     setFamilyMembers(selectedFamilyMembers);
 
     // Update familyDetails array to match the selected number of family members
     formik.setFieldValue(
       'familyDetails',
       Array(selectedFamilyMembers).fill({ firstName: '', lastName: '', cnic: '', age: '' })
     );
   };*/

  const handleFamilyMemberChange = (e) => {
    const num = parseInt(e.target.value);
    setFamilyMembers(num);

    // Set familyDetails length based on number of family members
    const familyMembers = [...Array(num)].map(() => ({
      firstName: '',
      cnic: '',
      age: '',
      lastDonationMonth: '',
      lastDonationYear: ''
    }));
    formik.setFieldValue('familyMembers', familyMembers);
  };

  return (
    <div className="gradient-bg">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-full py-10">
        <div className="glass-form">
          <div className="title-container">
            Register As Family Group Donor
          </div>
          <div className="title flex flex-col items-center">
            <span className="py-1 text-lg w-2/3 text-center text-black">
              Happy to have you with us!
            </span>
          </div>

          <form className="py-5" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              {/* Name */}
              <div className="flex justify-between w-full gap-5">
                <label className="form-label" htmlFor="firstName">First Name</label>
                <input
                  {...formik.getFieldProps('firstName')}
                  className="textbox-input"
                  type="text"
                  placeholder="First Name"
                />
                <label className="form-label" htmlFor="lastName">Last Name</label>
                <input
                  {...formik.getFieldProps('lastName')}
                  className="textbox-input"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              {/* Contact & CNIC */}
              <div className="flex justify-between w-full gap-5">
                <label className="form-label" htmlFor="phoneNumber">Phone #</label>
                <input
                  {...formik.getFieldProps('phoneNumber')}
                  value={formik.values.phoneNumber || '+92 3'}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Ensure that the user cannot remove "+92 3" from the input
                    if (value.startsWith('+92 3') && value.length <= 14) {
                      formik.setFieldValue('phoneNumber', value);
                    }
                  }}
                  className="textbox-input"
                  type="tel"
                  placeholder="Phone Number"
                  maxLength={14}  // +92 3 + 10 digits = 14 characters total
                />
                <label className="form-label" htmlFor="cnic">CNIC</label>
                <input
                  {...formik.getFieldProps('cnic')}
                  value={formatCNIC(formik.values.cnic)}
                  onChange={(e) =>
                    formik.setFieldValue('cnic', formatCNIC(e.target.value))
                  }
                  className="textbox-input"
                  type="text"
                  placeholder="XXXXX-XXXXXXX-X"
                  maxLength={15}
                />
              </div>

              <div className="flex justify-between w-full gap-5">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  {...formik.getFieldProps('email')}
                  className="textbox-input"
                  type="text"
                  placeholder="Email"
                />
                <label className="form-label" htmlFor="username">Username</label>
                <input
                  {...formik.getFieldProps('username')}
                  className="textbox-input"
                  type="text"
                  placeholder="Username"
                />
              </div>

              {/* Age & Blood Group */}
              <div className="flex justify-between w-full gap-5">
                <label className="form-label" htmlFor="age">Age</label>
                <input
                  {...formik.getFieldProps('age')}
                  className="textbox-input"
                  type="number"
                  placeholder="Age"
                />
                <label className="form-label" htmlFor="bloodGroup">Blood Group</label>
                <input
                  {...formik.getFieldProps('bloodGroup')}
                  className="textbox-input"
                  type="text"
                  placeholder="O+, A+, B+, AB+, O-, A-, B-, AB-"
                />
              </div>

              {/* Dropdown for Number of Family Members */}
              <div className="flex justify-between w-full gap-5">
                <label className="form-label" htmlFor="familyMembers">No. of Family Members</label>
                <select
                  className="textbox-input"
                  value={familyMembers}
                  onChange={handleFamilyMemberChange}
                >
                  <option value="" disabled>Select Number of family members</option>
                  {[...Array(10).keys()].map((number) => (
                    <option key={number + 1} value={number + 1}>
                      {number + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Family Member Fields */}
              {[...Array(familyMembers)].map((_, index) => (
                <div key={index} className="family-member-section">
                  <div className="flex justify-between w-full gap-5 mb-6">
                    <label className="form-label">F.Name {index + 1}</label>
                    <input
                      {...formik.getFieldProps(`familyMembers[${index}].firstName`)}
                      className="textbox-input"
                      type="text"
                      placeholder={`First Name ${index + 1}`}
                    />
                    <label className="form-label">L.Name {index + 1}</label>
                    <input
                      {...formik.getFieldProps(`familyMembers[${index}].lastName`)}
                      className="textbox-input"
                      type="text"
                      placeholder={`Last Name ${index + 1}`}
                    />
                  </div>
                  <div className="flex justify-between w-full gap-5">
                    <label className="form-label">CNIC {index + 1}</label>
                    <input
                      {...formik.getFieldProps(`familyMembers[${index}].cnic`)}
                      className="textbox-input"
                      type="text"
                      placeholder="XXXXX-XXXXXXX-X"
                      maxLength={15}
                    />
                    <label className="form-label">Age {index + 1}</label>
                    <input
                      {...formik.getFieldProps(`familyMembers[${index}].age`)}
                      className="textbox-input"
                      type="number"
                      placeholder={`Age ${index + 1}`}
                    />
                  </div>
                </div>
              ))}

              {/* Password with PrimeReact Toggle Mask */}
              <div className="flex justify-between w-full gap-5">
                <label className="form-label" htmlFor="password">Password</label>
                <Password
                  value={formik.values.password}
                  onChange={(e) => formik.setFieldValue('password', e.target.value)}
                  toggleMask
                  placeholder="Password"
                  className="textbox-input"
                />
                <label className="form-label" htmlFor="confirm_password">Confirm Password</label>
                <Password
                  value={formik.values.confirm_password}
                  onChange={(e) => formik.setFieldValue('confirm_password', e.target.value)}
                  toggleMask
                  placeholder="Confirm Password"
                  className="textbox-input"
                />
              </div>

              {/* Location */}
              <div className="flex justify-between w-full gap-5">
                <label className="form-label">Province</label>
                <select
                  className="textbox-input"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                >
                  <option value="" disabled>
                    Select Province
                  </option>
                  {provinceData.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
                <label className="form-label">City</label>
                <select
                  className="textbox-input"
                  value={selectedCity}
                  onChange={handleCityChange}
                  disabled={!selectedProvince}
                >
                  <option value="" disabled>
                    Select City
                  </option>
                  {cityData[selectedProvince]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between w-full gap-5">
                <label className="form-label">District</label>
                <select
                  className="textbox-input"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  disabled={!selectedCity}
                >
                  <option value="" disabled>
                    Select District
                  </option>
                  {districtData[selectedCity]?.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>

                <label className="form-label">Postal Code</label>
                <input
                  {...formik.getFieldProps('pinCode')}
                  className="textbox-input"
                  type="text"
                  placeholder="Code"
                />
              </div>

              {/* Donation History */}
              <div className="flex justify-between w-full gap-5">
                <input
                  {...formik.getFieldProps('lastDonationMonth')}
                  className="textbox-input"
                  type="text"
                  placeholder="Last Donation (Month)"
                />
                <input
                  {...formik.getFieldProps('lastDonationYear')}
                  className="textbox-input"
                  type="text"
                  placeholder="Last Donation (Year)"
                />
              </div>
              <button className="btn" type="submit">
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span>
                Already Registered?{' '}
                <Link className="text-blue-500 link" to="/">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}