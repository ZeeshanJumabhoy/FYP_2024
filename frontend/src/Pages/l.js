import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RegistrationForm = () => {
  const [familyMembers, setFamilyMembers] = useState(0);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      cnic: '',
      age: '',
      bloodGroup: '',
      province: '',
      city: '',
      district: '',
      pinCode: '',
      lastDonationMonth: '',
      lastDonationYear: '',
      familyMembers: [],
    },
    validationSchema: Yup.object({
      // Add validation schema as per your requirements
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
    <form onSubmit={formik.handleSubmit}>
      {/* Other individual fields */}
      
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
            <label className="form-label">Full Name {index + 1}</label>
            <input
              {...formik.getFieldProps(`familyMembers[${index}].firstName`)}
              className="textbox-input"
              type="text"
              placeholder={`Full Name ${index + 1}`}
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
          <div className="flex justify-between w-full gap-5">
            <label className="form-label">Last Donation Month {index + 1}</label>
            <input
              {...formik.getFieldProps(`familyMembers[${index}].lastDonationMonth`)}
              className="textbox-input"
              type="text"
              placeholder="MM"
            />
            <label className="form-label">Last Donation Year {index + 1}</label>
            <input
              {...formik.getFieldProps(`familyMembers[${index}].lastDonationYear`)}
              className="textbox-input"
              type="text"
              placeholder="YYYY"
            />
          </div>
        </div>
      ))}

      <button type="submit" className="btn-submit">Submit</button>
    </form>
  );
};

export default RegistrationForm;
