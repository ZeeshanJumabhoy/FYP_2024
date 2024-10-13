import { React, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../Helper/helper'
import useFetch from '../hooks/fetch'
import { provinceData, cityData, districtData } from "../Helper/location";
import '../Styles/card.css'

export default function Register() {
  const [{ isLoading, error, apiData }] = useFetch()
  const navigate = useNavigate()

  // Format CNIC to XXXXX-XXXXXXX-X pattern
  const formatCNIC = (value) => {
    let cnic = value.replace(/\D/g, ""); // Remove all non-numeric characters
    if (cnic.length > 5) cnic = `${cnic.slice(0, 5)}-${cnic.slice(5)}`;
    if (cnic.length > 13) cnic = `${cnic.slice(0, 13)}-${cnic.slice(13, 14)}`;
    return cnic;
  };

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      phoneNumber: apiData?.phoneNumber || '',
      email: apiData?.email || '',
      cnic: apiData?.cnic || '',
      age: apiData?.age || '',
      bloodGroup: apiData?.bloodGroup || '',
      province: apiData?.province || '',
      city: apiData?.city || '',
      district: apiData?.district || '',
      pinCode: apiData?.pinCode || '',
      lastDonationMonth: apiData?.lastDonationMonth || '',
      lastDonationYear: apiData?.lastDonationYear || '',
    },

    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      try {
        const updatePromise = updateUser(values);
        
        await toast.promise(updatePromise, {
          loading: 'Updating...',
          success: <b>Profile Updated Successfully!</b>,
          error: (err) => {
            console.log(err);
            const errorMessage = err.response?.data?.message || "Couldn't Update the Profile...!";
            return <b>{errorMessage}</b>; // Display the backend error message
          }
        });
    
      } catch (err) {
        console.log("Caught Error:", err); // Ensure errors are logged properly
      }
    },
    
  })

  const onLogout = async () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  if (!apiData) {
    return (
      <div className="flex justify-center items-center flex-col mt-20">
        <h1 className="text-2xl font-bold text-blue-500">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center flex-col mt-20">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <h1 className="text-2xl font-bold text-red-500">Server Error</h1>
        <p>{error?.message}</p>
      </div>
    )
  }

  return (
    <div className="gradient-bg">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-full py-10">
        <div className="glass-form">
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Update Profile</h4>
            <span className="py-1 text-lg w-full text-center text-gray-500">
              You can update the details.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center"></div>

            <div className="textbox flex flex-col items-center gap-6">
              {/* First Name and Last Name */}
              <div className="flex justify-between w-full gap-5">
                <label className="form-label" htmlFor="firstName">
                  First Name
                </label>
                <input
                  {...formik.getFieldProps("firstName")}
                  className="textbox-input"
                  type="text"
                  placeholder="First Name"
                />
                <label className="form-label" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  {...formik.getFieldProps("lastName")}
                  className="textbox-input"
                  type="text"
                  placeholder="Last Name"
                />
              </div>

              {/* Contact & CNIC*/}
              <div className="flex justify-between w-full gap-5">
                <label className="form-label" htmlFor="phoneNumber">
                  Phone #
                </label>
                <input
                  {...formik.getFieldProps("phoneNumber")}
                  value={formik.values.phoneNumber || "+92 3"}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Ensure that the user cannot remove "+92 3" from the input
                    if (value.startsWith("+92 3") && value.length <= 14) {
                      formik.setFieldValue("phoneNumber", value);
                    }
                  }}
                  className="textbox-input"
                  type="tel"
                  placeholder="Phone Number"
                  maxLength={14} // +92 3 + 10 digits = 14 characters total
                />
                <label className="form-label" htmlFor="cnic">
                  CNIC
                </label>
                <input
                  {...formik.getFieldProps("cnic")}
                  value={formatCNIC(formik.values.cnic)}
                  onChange={(e) =>
                    formik.setFieldValue("cnic", formatCNIC(e.target.value))
                  }
                  className="textbox-input"
                  type="text"
                  placeholder="XXXXX-XXXXXXX-X"
                  maxLength={15}
                />
              </div>

              {/* Age & Blood Group */}
              <div className="flex justify-between w-full gap-5">
                <label className="form-label" htmlFor="age">
                  Age
                </label>
                <input
                  {...formik.getFieldProps("age")}
                  className="textbox-input"
                  type="number"
                  placeholder="Age"
                />
                <label className="form-label" htmlFor="bloodGroup">
                  Blood Group
                </label>
                <input
                  {...formik.getFieldProps("bloodGroup")}
                  className="textbox-input"
                  type="text"
                  placeholder="O+, A+, B+, AB+, O-, A-, B-, AB-"
                />
              </div>

              {/*Province & CIty*/}
              <div className="flex justify-between w-full gap-5">
                <label className="form-label">Province</label>
                <select
                  className="textbox-input"
                  value={formik.values.province} // Set the value to the current formik value
                  onChange={(e) => {
                    handleProvinceChange(e); // Keep the handleProvinceChange logic
                    formik.setFieldValue('province', e.target.value); // Update formik's field value when the province changes
                  }}
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
                  value={formik.values.city} // Set the value to the current formik value
                  onChange={(e) => {
                    handleCityChange(e); // Keep the handleCityChange logic
                    formik.setFieldValue('city', e.target.value); // Update formik's field value when the city changes
                  }}
                  disabled={!formik.values.province} // Disable the city selection if no province is selected
                >
                  <option value="" disabled>
                    Select City
                  </option>
                  {cityData[formik.values.province]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>


              {/* District & Postal Code*/}
              <div className="flex justify-between w-full gap-5">
                <label className="form-label">District</label>
                <select
                  className="textbox-input"
                  value={formik.values.district} // Set the value to formik's district value
                  onChange={(e) => {
                    handleDistrictChange(e); // Keep your existing district change logic
                    formik.setFieldValue('district', e.target.value); // Update formik's field value when the district changes
                  }}
                  disabled={!formik.values.city} // Disable district selection if no city is selected
                >
                  <option value="" disabled>
                    Select District
                  </option>
                  {districtData[formik.values.city]?.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>


                <label className="form-label">Postal Code</label>
                <input
                  {...formik.getFieldProps("pinCode")}
                  className="textbox-input"
                  type="text"
                  placeholder="Code"
                />
              </div>

              {/* Donation History */}
              <div className="flex justify-between w-full gap-5">
                <input
                  {...formik.getFieldProps("lastDonationMonth")}
                  className="textbox-input"
                  type="text"
                  placeholder="Last Donation (Month)"
                />
                <input
                  {...formik.getFieldProps("lastDonationYear")}
                  className="textbox-input"
                  type="text"
                  placeholder="Last Donation (Year)"
                />
              </div>

              <button className="btn" type="submit">
                Update
              </button>
            </div>
          </form>

          <div className="text-center py-4">
            <span className="text-gray-500">
              Come back later?{' '}
              <button onClick={onLogout} className="text-red-500 link">
                Logout
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
