import React from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { requestBloodValidation } from "../Helper/Validate";
import { requestblood,sendBloodRequestEmails } from "../Helper/helper";
import useFetch from '../hooks/fetch';
import "../Styles/card.css";
import "primereact/resources/themes/saga-blue/theme.css"; // Import PrimeReact CSS
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../Styles/tailwind.css";

export default function RequestBlood() {
    const navigate = useNavigate();
    const [{ isLoading, error, apiData }] = useFetch();
    const { email, firstName } = apiData || {}; // Destructure email and firstName

    const formik = useFormik({
        initialValues: {
            patientName: "",
            bloodGroup: "",
            units: "",
            weight: "",
            antibodies: "",
            specialRequirements: [], // Changed from string to array
            medicalReason: "",
            otherMedicalReason: "",
            urgency: "Routine",
            bloodComponentType: "",
            allergiesAndReactions: "",
            hospitalName: "",
            department: "",
            patientId: "",
            transfusionDateTime: "",
            hospital: [], // Array to hold hospital info
        },

        validate: requestBloodValidation, // Adjust validation rules as needed
        validateOnBlur: false,
        validateOnChange: false,

        onSubmit: async (values) => {
            const hospitalInfo = {
                hospitalName: values.hospitalName,
                department: values.department,
                patientId: values.patientId,
            };

            const { hospitalName, department, patientId, ...requestValues } = values;
            requestValues.hospital = [hospitalInfo];
            requestValues.email = email;
            requestValues.firstName = firstName;

            const requestPromise = requestblood(requestValues);

            toast.promise(requestPromise, {
                loading: "Submitting request...",
                success: "Blood request submitted successfully!",
                error: "Failed to submit the request.",
            });

            requestPromise
            .then(() => {
                // Call the email function on success
               // sendbloodrequestemail(requestValues);
               sendBloodRequestEmails(requestValues)
                navigate('/profile', { state: { ...requestValues } });
            })
            .catch((err) => {
                // Display error message in case of failure
                toast.error(err.message || "Something went wrong!");
            });
    },
});
    return (
        <div className="gradient-bg">
            <Toaster position="top-center" reverseOrder={false}></Toaster>

            <div className="flex justify-center items-center h-full py-10">
                <div className="glass-form">
                    <div className="title-container">Blood Request Form</div>

                    <form className="py-5" onSubmit={formik.handleSubmit}>
                        <div className="textbox flex flex-col items-center gap-6">

                            {/* Patient Name */}
                            <label className="form-label" htmlFor="patientName">Patient Name</label>
                            <input
                                {...formik.getFieldProps("patientName")}
                                className="textbox-input"
                                type="text"
                                placeholder="Patient Name"
                            />

                            {/* Blood Group */}
                            <label className="form-label" htmlFor="bloodGroup">Blood Group</label>
                            <select
                                {...formik.getFieldProps("bloodGroup")}
                                className="textbox-input"
                            >
                                <option value="" disabled>Select Blood Group</option>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                                    <option key={group} value={group}>{group}</option>
                                ))}
                            </select>

                            {/* Units and Weight */}
                            <label className="form-label" htmlFor="units">Units Needed</label>
                            <input
                                {...formik.getFieldProps("units")}
                                className="textbox-input"
                                type="number"
                                placeholder="Units"
                                min="1"
                                max="10"
                            />
                            <label className="form-label" htmlFor="weight">Patient Weight</label>
                            <input
                                {...formik.getFieldProps("weight")}
                                className="textbox-input"
                                type="number"
                                placeholder="Weight (kg)"
                                min="0"
                            />
                            {/* AntiBodies */}
                            <label className="form-label" htmlFor="antibodies">Any Antibodies</label>
                            <select
                                {...formik.getFieldProps("antibodies")}
                                className="textbox-input"
                            >
                                <option value="" disabled>Select Any Antibodies</option>
                                {['None', 'Anti-A', 'Anti-B', 'Anti-A and Anti-B', 'Anti-D', 'Anti-A, Anti-D', 'Anti-B, Anti-D', 'Anti-A and Anti-B, Anti-D'].map(group => (
                                    <option key={group} value={group}>{group}</option>
                                ))}
                            </select>

                            {/* Special Requirements */}
                            <label className="form-label" htmlFor="specialRequirements">Special Requirements</label>
                            <div className="checkbox-group">
                                {[
                                    'None', 'Irradiated Blood', 'Leukocyte Reduced',
                                    'Washed Blood', 'CMV-Negative Blood',
                                    'HLA-Matched Platelets', 'Fresh Blood (<5 Days Old)'
                                ].map(requirement => (
                                    <label key={requirement} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="specialRequirements"
                                            value={requirement}
                                            checked={formik.values.specialRequirements.includes(requirement)}
                                            onChange={(e) => {
                                                if (requirement === 'None') {
                                                    if (e.target.checked) {
                                                        // If 'None' is selected, clear all other options
                                                        formik.setFieldValue("specialRequirements", ['None']);
                                                    } else {
                                                        // If 'None' is unchecked, clear it from the selection
                                                        formik.setFieldValue(
                                                            "specialRequirements",
                                                            formik.values.specialRequirements.filter(r => r !== 'None')
                                                        );
                                                    }
                                                } else {
                                                    if (e.target.checked) {
                                                        // If any other option is selected, remove 'None' and add the current requirement
                                                        formik.setFieldValue(
                                                            "specialRequirements",
                                                            formik.values.specialRequirements
                                                                .filter(r => r !== 'None')
                                                                .concat(requirement)
                                                        );
                                                    } else {
                                                        // Uncheck the current requirement
                                                        formik.setFieldValue(
                                                            "specialRequirements",
                                                            formik.values.specialRequirements.filter(r => r !== requirement)
                                                        );
                                                    }
                                                }
                                            }}
                                        />
                                        {requirement}
                                    </label>
                                ))}
                            </div>


                            {/* Medical Reason */}
                            <label className="form-label" htmlFor="medicalReason">Medical Reason</label>
                            <select
                                {...formik.getFieldProps("medicalReason")}
                                className="textbox-input"
                                onChange={(e) => {
                                    formik.setFieldValue("medicalReason", e.target.value);
                                    if (e.target.value !== 'Other') {
                                        formik.setFieldValue("otherMedicalReason", "");
                                    }
                                }}
                            >
                                {[
                                    'Anemia', 'Trauma/Emergency Surgery', 'Elective Surgery',
                                    'Cancer Treatment', 'Organ Transplant', 'Burn Treatment',
                                    'Bleeding Disorder (e.g., Hemophilia)', 'Pregnancy/Childbirth Complications',
                                    'Heart Surgery', 'Liver Disease', 'Kidney Disease',
                                    'Neonatal Transfusion', 'Other'
                                ].map(reason => (
                                    <option key={reason} value={reason}>{reason}</option>
                                ))}
                            </select>
                            {formik.values.medicalReason === 'Other' && (
                                <input
                                    {...formik.getFieldProps("otherMedicalReason")}
                                    className="textbox-input"
                                    type="text"
                                    placeholder="Specify other reason"
                                />
                            )}

                            {/* Urgency */}
                            <label className="form-label" htmlFor="urgency">Urgency</label>
                            <select
                                {...formik.getFieldProps("urgency")}
                                className="textbox-input"
                            >
                                {['Emergency', 'Urgent', 'Routine'].map(urgency => (
                                    <option key={urgency} value={urgency}>{urgency}</option>
                                ))}
                            </select>

                            {/* Blood Component Type */}
                            <label className="form-label" htmlFor="bloodComponentType">Blood Component Type</label>
                            <select
                                {...formik.getFieldProps("bloodComponentType")}
                                className="textbox-input"
                            >
                                {[
                                    'Whole Blood', 'Red Blood Cells (RBCs)', 'Platelets',
                                    'Plasma', 'Cryoprecipitate', 'Granulocytes'
                                ].map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>

                            {/* Allergies and Reactions */}
                            <label className="form-label" htmlFor="allergiesAndReactions">Allergies and Reactions</label>
                            <input
                                {...formik.getFieldProps("allergiesAndReactions")}
                                className="textbox-input"
                                type="text"
                                placeholder="Allergies or reactions"
                            />

                            {/* Hospital Information */}
                            <label className="form-label" htmlFor="hospitalName">Hospital Name</label>
                            <input
                                {...formik.getFieldProps("hospitalName")}
                                className="textbox-input"
                                type="text"
                                placeholder="Hospital Name"
                            />
                            <label className="form-label" htmlFor="department">Department</label>
                            <input
                                {...formik.getFieldProps("department")}
                                className="textbox-input"
                                type="text"
                                placeholder="Department"
                            />
                            <label className="form-label" htmlFor="patientId">Patient ID</label>
                            <input
                                {...formik.getFieldProps("patientId")}
                                className="textbox-input"
                                type="text"
                                placeholder="Patient ID"
                            />

                            {/* Transfusion Date and Time */}
                            <label className="form-label" htmlFor="transfusionDateTime">Transfusion Date & Time</label>
                            <input
                                {...formik.getFieldProps("transfusionDateTime")}
                                className="textbox-input"
                                type="datetime-local"
                            />

                            <button className="btn" type="submit">
                                Submit Blood Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
