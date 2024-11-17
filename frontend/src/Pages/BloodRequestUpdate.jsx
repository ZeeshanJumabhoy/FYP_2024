import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { requestBloodValidation } from "../Helper/Validate";
import { getBloodRequestById,updateBloodRequest } from "../Helper/helper";
import "../Styles/card.css";
import "primereact/resources/themes/saga-blue/theme.css"; // PrimeReact CSS
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../Styles/tailwind.css";

export default function BloodRequestUpdatePage() {
    const { id } = useParams(); // Extract 'id' from the URL
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({
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
    });

    // Fetch and update the blood request details
    useEffect(() => {
        async function fetchBloodRequest() {
            try {
                const { data } = await getBloodRequestById(id);
                const {
                    patientName,
                    bloodGroup,
                    units,
                    weight,
                    antibodies,
                    specialRequirements,
                    hospital,
                    patientId,
                    transfusionDateTime,
                    medicalReason,
                    otherMedicalReason,
                    urgency,
                    bloodComponentType
                } = data.requests;

                // Format transfusionDateTime to 'YYYY-MM-DDTHH:mm' for datetime-local input
                const formattedDateTime = transfusionDateTime
                    ? new Date(transfusionDateTime).toISOString().slice(0, 16)
                    : "";

                setInitialValues({
                    patientName,
                    bloodGroup,
                    units,
                    weight,
                    antibodies,
                    specialRequirements,
                    medicalReason: medicalReason || "",
                    otherMedicalReason: otherMedicalReason || "",
                    urgency: urgency || "Routine",
                    bloodComponentType: bloodComponentType || "",
                    allergiesAndReactions: data.requests.allergiesAndReactions || "",
                    hospitalName: hospital?.hospitalname || "",
                    department: hospital?.department || "",
                    patientId: hospital?.patientId || "",
                    transfusionDateTime: formattedDateTime,
                });
            } catch (error) {
                console.error("Error fetching blood request:", error);
                toast.error("Failed to fetch blood request details!");
            }
        }

        if (id) {
            fetchBloodRequest();
        }
    }, [id]);


    const formik = useFormik({
        initialValues,
        enableReinitialize: true, // Enable form values to reinitialize when `initialValues` changes
        validate: requestBloodValidation,
        validateOnBlur: false,
        validateOnChange: false,

        onSubmit: async (values) => {
            const errors = requestBloodValidation(values);
            if (Object.keys(errors).length > 0) {
                Object.values(errors).forEach((error) => toast.error(error));
                return;
            }

            const hospitalInfo = {
                hospitalName: values.hospitalName,
                department: values.department,
                patientId: values.patientId,
            };

            const { hospitalName, department, patientId, ...requestValues } = values;
            requestValues.hospital = [hospitalInfo];

            const updatePromise = updateBloodRequest(id,requestValues);

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

                            {/* Medical Reason and Urgency Section */}
                            <div className="flex flex-col w-full gap-5">
                                <div className="flex justify-between w-full gap-5">
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
                                        <option value="" disabled>Select Medical Reason</option>
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

                                    {/* Specify Other Medical Reason */}
                                    {formik.values.medicalReason === 'Other' && (
                                        <input
                                            {...formik.getFieldProps("otherMedicalReason")}
                                            className="textbox-input"
                                            type="text"
                                            placeholder="Specify other reason"
                                        />
                                    )}
                                </div>

                                {/* Urgency */}
                                <div className="flex justify-between w-full gap-5">
                                    <label className="form-label" htmlFor="urgency">Urgency</label>
                                    <select
                                        {...formik.getFieldProps("urgency")}
                                        className="textbox-input"
                                    >
                                        <option value="" disabled>Select Urgency</option>
                                        {['Emergency', 'Urgent', 'Routine'].map(urgency => (
                                            <option key={urgency} value={urgency}>{urgency}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Blood Component Type */}
                                <div className="flex justify-between w-full gap-5">
                                    <label className="form-label" htmlFor="bloodComponentType">Blood Component Type</label>
                                    <select
                                        {...formik.getFieldProps("bloodComponentType")}
                                        className="textbox-input"
                                    >
                                        <option value="" disabled>Select Blood Component Type</option>
                                        {[
                                            'Whole Blood', 'Red Blood Cells (RBCs)', 'Platelets',
                                            'Plasma', 'Cryoprecipitate', 'Granulocytes'
                                        ].map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
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

                            {/* Submit Button */}
                            <button type="submit" className="btn btn-primary">Update Request</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
