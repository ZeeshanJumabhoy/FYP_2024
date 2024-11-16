import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { requestBloodValidation } from "../Helper/Validate";
import axios from "axios";
import { updateBloodRequest } from "../Helper/helper";
import useFetch from '../hooks/fetch';
import "../Styles/card.css";
import "primereact/resources/themes/saga-blue/theme.css"; // Import PrimeReact CSS
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../Styles/tailwind.css";

export default function BloodRequestUpdatePage() {
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState(null);
    const [{ apiData, isLoading: emailLoading, error: emailError }] = useFetch();
    const { email } = apiData || {}; // User email from fetch

    useEffect(() => {
        if (email) {
            // Fetch existing blood request details
            axios.get(`/api/getbloodrequestinfo/${email}`)
                .then((response) => {
                    const requestDetails = response.data;
                    setInitialValues({
                        patientName: requestDetails.patientName || "",
                        bloodGroup: requestDetails.bloodGroup || "",
                        units: requestDetails.units || "",
                        weight: requestDetails.weight || "",
                        antibodies: requestDetails.antibodies || "",
                        specialRequirements: requestDetails.specialRequirements || [],
                        medicalReason: requestDetails.medicalReason || "",
                        otherMedicalReason: requestDetails.otherMedicalReason || "",
                        urgency: requestDetails.urgency || "Routine",
                        bloodComponentType: requestDetails.bloodComponentType || "",
                        allergiesAndReactions: requestDetails.allergiesAndReactions || "",
                        hospitalName: requestDetails.hospital?.[0]?.hospitalName || "",
                        department: requestDetails.hospital?.[0]?.department || "",
                        patientId: requestDetails.hospital?.[0]?.patientId || "",
                        transfusionDateTime: requestDetails.transfusionDateTime || "",
                    });
                })
                .catch((err) => {
                    toast.error("Failed to fetch blood request details!");
                });
        }
    }, [email]);

    const formik = useFormik({
        initialValues: initialValues || {
            patientName: "",
            bloodGroup: "",
            units: "",
            weight: "",
            antibodies: "",
            specialRequirements: [],
            medicalReason: "",
            otherMedicalReason: "",
            urgency: "Routine",
            bloodComponentType: "",
            allergiesAndReactions: "",
            hospitalName: "",
            department: "",
            patientId: "",
            transfusionDateTime: "",
        },
        enableReinitialize: true,
        validate: requestBloodValidation,
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

            const updatePromise = updateBloodRequest(requestValues);

            toast.promise(updatePromise, {
                loading: "Updating blood request...",
                success: "Blood request updated successfully!",
                error: "Failed to update the request.",
            });

            updatePromise
                .then(() => navigate('/profile', { state: { ...requestValues } }))
                .catch((err) => toast.error(err.message || "Something went wrong!"));
        },
    });

    if (!initialValues || emailLoading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="gradient-bg">
            <Toaster position="top-center" reverseOrder={false}></Toaster>

            <div className="flex justify-center items-center h-full py-10">
                <div className="glass-form">
                    <div className="title-container">Update Blood Request</div>

                    <form className="py-1" onSubmit={formik.handleSubmit}>
                        <div className="textbox flex flex-col items-center gap-6">
                            <div className="flex justify-between w-full gap-5">
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
                            </div>

                            <div className="flex justify-between w-full gap-5">
                                {/* Units */}
                                <label className="form-label" htmlFor="units">Units Needed</label>
                                <input
                                    {...formik.getFieldProps("units")}
                                    className="textbox-input"
                                    type="number"
                                    placeholder="Units"
                                    min="1"
                                    max="10"
                                />
                                {/* Weight */}
                                <label className="form-label" htmlFor="weight">Patient Weight</label>
                                <input
                                    {...formik.getFieldProps("weight")}
                                    className="textbox-input"
                                    type="number"
                                    placeholder="Weight (kg)"
                                    min="0"
                                />
                            </div>

                            {/* Antibodies */}
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
                                                const updatedRequirements = formik.values.specialRequirements;
                                                if (e.target.checked) {
                                                    updatedRequirements.push(requirement);
                                                } else {
                                                    const index = updatedRequirements.indexOf(requirement);
                                                    updatedRequirements.splice(index, 1);
                                                }
                                                formik.setFieldValue("specialRequirements", [...updatedRequirements]);
                                            }}
                                        />
                                        {requirement}
                                    </label>
                                ))}
                            </div>

                            {/* Hospital Details */}
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

                            {/* Transfusion Date & Time */}
                            <label className="form-label" htmlFor="transfusionDateTime">Transfusion Date & Time</label>
                            <input
                                {...formik.getFieldProps("transfusionDateTime")}
                                className="textbox-input"
                                type="datetime-local"
                            />

                            <button className="btn" type="submit">
                                Update Blood Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
