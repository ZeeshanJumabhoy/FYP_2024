import { Router } from 'express';

// Import all controllers
import * as controller from '../controllers/appcontroller.js';
import * as middleware from '../middleware/middleware.js';
import sendMail from '../controllers/mailer.js'; 

const router = Router();
// SWAGEER STARTING

/**
 * @swagger
 * /api/registerCheck:
 *   post:
 *     summary: Check if email, CNIC, or phone number is already in use.
 *     description: Verifies whether an email, CNIC, or phone number is already associated with an existing user or family registration.
 *     tags:
 *       - Registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - cnic
 *               - phoneNumber
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               cnic:
 *                 type: string
 *                 example: "12345-6789012-3"
 *               phoneNumber:
 *                 type: string
 *                 example: "03001234567"
 *               familyMembers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       example: "Ali"
 *                     lastName:
 *                       type: string
 *                       example: "Khan"
 *                     cnic:
 *                       type: string
 *                       example: "23456-7890123-4"
 *                     age:
 *                       type: integer
 *                       example: 25
 *     responses:
 *       201:
 *         description: All details are valid for registration.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All okay - Individual registration"
 *       400:
 *         description: A provided email, CNIC, or phone number is already in use.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The following detail is already in use"
 *                 detail:
 *                   type: string
 *                   example: "user@example.com"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
router.route('/registerCheck').post(controller.registerCheck);

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user (Individual, Family, or Corporate).
 *     description: Registers a new user based on the selected user type. Supports individual, family, and corporate registrations.
 *     tags:
 *       - Registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phoneNumber
 *               - cnic
 *               - age
 *               - bloodGroup
 *               - username
 *               - password
 *               - province
 *               - city
 *               - district
 *               - pinCode
 *               - userType
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Ali"
 *               lastName:
 *                 type: string
 *                 example: "Khan"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               phoneNumber:
 *                 type: string
 *                 example: "03001234567"
 *               cnic:
 *                 type: string
 *                 example: "12345-6789012-3"
 *               age:
 *                 type: integer
 *                 example: 28
 *               bloodGroup:
 *                 type: string
 *                 example: "O+"
 *               username:
 *                 type: string
 *                 example: "ali_khan"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securepassword123"
 *               province:
 *                 type: string
 *                 example: "Punjab"
 *               city:
 *                 type: string
 *                 example: "Lahore"
 *               district:
 *                 type: string
 *                 example: "Model Town"
 *               pinCode:
 *                 type: string
 *                 example: "54000"
 *               lastDonationMonth:
 *                 type: string
 *                 example: "January"
 *               lastDonationYear:
 *                 type: integer
 *                 example: 2024
 *               userType:
 *                 type: string
 *                 enum: ["individual", "family", "corporate"]
 *                 example: "individual"
 *               familyMembers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       example: "Hassan"
 *                     lastName:
 *                       type: string
 *                       example: "Ali"
 *                     cnic:
 *                       type: string
 *                       example: "67890-1234567-8"
 *                     age:
 *                       type: integer
 *                       example: 23
 *               companyName:
 *                 type: string
 *                 example: "TechCorp"
 *               companyType:
 *                 type: string
 *                 example: "Software"
 *               companyEmployeesNum:
 *                 type: integer
 *                 example: 50
 *               companyAddress:
 *                 type: string
 *                 example: "123 Business Street, Lahore"
 *               contactPerson:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Ahmed Raza"
 *                   email:
 *                     type: string
 *                     example: "ahmed.raza@techcorp.com"
 *                   phone:
 *                     type: string
 *                     example: "03005556677"
 *                   cnic:
 *                     type: string
 *                     example: "98765-4321098-7"
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Individual user registered successfully"
 *       400:
 *         description: Validation error or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "CNIC is already associated with another user"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 *                 error:
 *                   type: string
 *                   example: "Unexpected error occurred"
 */
router.route('/register').post(controller.register);

/**
 * @swagger
 * /api/register-bloodbank-credentials:
 *   post:
 *     summary: Register blood bank credentials.
 *     description: Registers a new blood bank's credentials, ensuring the email and bloodBankId are unique.
 *     tags: 
 *       - Blood Bank Credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bloodBankId:
 *                 type: string
 *                 example: "BB12345"
 *               authorizedPersonName:
 *                 type: string
 *                 example: "Dr. John Doe"
 *               email:
 *                 type: string
 *                 example: "bloodbank@example.com"
 *               userEmail:
 *                 type: string
 *                 example: "bloodbank@example.com"
 *               password:
 *                 type: string
 *                 example: "SecurePass@123"
 *     responses:
 *       201:
 *         description: Blood bank credentials created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blood Bank Credentials Created Successfully"
 *       400:
 *         description: Email or Blood Bank ID already exists.
 *       500:
 *         description: Internal Server Error.
 */
router.route('/register-bloodbank-credentials').post(controller.registerBloodBankCredentials);

/**
 * @swagger
 * /api/update-bloodbank-credentials:
 *   put:
 *     summary: Update blood bank credentials.
 *     description: Updates blood bank credentials only if the correct old password is provided. The bloodBankId cannot be changed.
 *     tags: 
 *       - Blood Bank Credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bloodBankId:
 *                 type: string
 *                 example: "BB12345"
 *               oldPassword:
 *                 type: string
 *                 example: "OldSecurePass@123"
 *               newPassword:
 *                 type: string
 *                 example: "NewSecurePass@456"
 *               authorizedPersonName:
 *                 type: string
 *                 example: "Dr. Jane Doe"
 *               email:
 *                 type: string
 *                 example: "newemail@example.com"
 *     responses:
 *       200:
 *         description: Blood bank credentials updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blood Bank Credentials Updated Successfully"
 *       400:
 *         description: Old password is incorrect.
 *       404:
 *         description: Blood Bank Credentials not found.
 *       500:
 *         description: Internal Server Error.
 */
router.route('/update-bloodbank-credentials').put(controller.updateBloodBankCredentials);

/**
 * @swagger
 * /api/login-bloodbank:
 *   post:
 *     summary: Login for blood bank credentials.
 *     description: Authenticates a blood bank using email and password. Returns a JWT token upon successful login.
 *     tags: 
 *       - Blood Bank Credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "bloodbank@example.com"
 *               password:
 *                 type: string
 *                 example: "SecurePass@123"
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Login Successful"
 *                 authorizedPersonName:
 *                   type: string
 *                   example: "Dr. John Doe"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Email or password missing.
 *       404:
 *         description: Email not found.
 *       401:
 *         description: Invalid password.
 *       500:
 *         description: Internal Server Error.
 */
router.route('/login-bloodbank').post(controller.loginBloodBank);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Authenticate a user and generate a JWT token.
 *     description: Allows a user to log in using their email and password. Returns a JWT token if authentication is successful.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Login Successful"
 *                 username:
 *                   type: string
 *                   example: "johndoe"
 *                 token:
 *                   type: string
 *                   example: "jwt_token_here"
 *       400:
 *         description: Missing email or password.
 *       500:
 *         description: Internal server error or invalid credentials.
 */
router.route('/login').post(controller.login);

/**
 * @swagger
 * /api/user/{email}:
 *   get:
 *     summary: Retrieve user details by email.
 *     description: Fetches user details by email, excluding the password field.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: Email of the user to retrieve.
 *     responses:
 *       200:
 *         description: User data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 username: "johndoe"
 *                 email: "user@example.com"
 *       404:
 *         description: User not found.
 *       501:
 *         description: Internal server error.
 */
router.route('/user/:email').get(controller.getUser);

/**
 * @swagger
 * /api/fetchuser/{id}:
 *   get:
 *     summary: Retrieve user details by ID.
 *     description: Fetches user details by ID. If the user belongs to a family, their family members are also included.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique user ID.
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 firstName: "John"
 *                 lastName: "Doe"
 *                 email: "user@example.com"
 *                 userType: "individual"
 *       400:
 *         description: Invalid User ID.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.route('/fetchuser/:id').get(controller.getfetchUser);

/**
 * @swagger
 * /api/update-user:
 *   put:
 *     summary: Update user details.
 *     description: Updates user details based on authentication. Checks for duplicate CNIC or phone number before updating. Supports individual and family users.
 *     tags: 
 *       - Users
 *     security:
 *       - BearerAuth: [] # Requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               phoneNumber:
 *                 type: string
 *                 example: "03001234567"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               cnic:
 *                 type: string
 *                 example: "12345-6789012-3"
 *               age:
 *                 type: integer
 *                 example: 30
 *               bloodGroup:
 *                 type: string
 *                 example: "O+"
 *               province:
 *                 type: string
 *                 example: "Punjab"
 *               city:
 *                 type: string
 *                 example: "Lahore"
 *               district:
 *                 type: string
 *                 example: "Lahore District"
 *               pinCode:
 *                 type: string
 *                 example: "54000"
 *               lastDonationMonth:
 *                 type: string
 *                 example: "January"
 *               lastDonationYear:
 *                 type: integer
 *                 example: 2023
 *               userType:
 *                 type: string
 *                 enum: ["individual", "family"]
 *                 example: "family"
 *               familyMembers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       example: "Ali"
 *                     lastName:
 *                       type: string
 *                       example: "Ahmed"
 *                     cnic:
 *                       type: string
 *                       example: "12345-6789012-4"
 *                     age:
 *                       type: integer
 *                       example: 25
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully!"
 *       400:
 *         description: CNIC or phone number already registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "CNIC or Phone Number already registered...!"
 *       404:
 *         description: Invalid User Id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid User Id...!"
 *       500:
 *         description: Internal server error.
 */
router.route('/update-user').put(middleware.auth, controller.updateUser);

/**
 * @swagger
 * /api/generate-otp:
 *   get:
 *     summary: Generate a 6-digit OTP.
 *     description: Generates a one-time password (OTP) for verification.
 *     tags: 
 *       - Authentication
 *     responses:
 *       201:
 *         description: OTP generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 OTP:
 *                   type: string
 *                   example: "123456"
 *       401:
 *         description: Unauthorized request.
 */
router.route('/generate-otp').get(controller.generateOTP);

/**
 * @swagger
 * /api/verify-otp:
 *   get:
 *     summary: Verify OTP.
 *     description: Verifies the provided OTP against the generated OTP.
 *     tags: 
 *       - Authentication
 *     parameters:
 *       - in: query
 *         name: otp
 *         required: true
 *         schema:
 *           type: string
 *         example: "123456"
 *         description: The OTP received by the user.
 *     responses:
 *       201:
 *         description: OTP verified successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "OTP Verified Successfully"
 *       400:
 *         description: Invalid OTP provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid OTP"
 *       401:
 *         description: Unauthorized request.
 */
router.route('/verify-otp').get(controller.verifyOTP);

/**
 * @swagger
 * /api/reset-password:
 *   put:
 *     summary: Reset a user's password.
 *     description: Allows a user to reset their password if their session is valid. The new password cannot be the same as the old password.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []  # If authentication is required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *                 description: The registered email of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "NewSecurePassword123!"
 *                 description: The new password for the account.
 *     responses:
 *       201:
 *         description: Password updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Password Updated Successfully"
 *       400:
 *         description: New password cannot be the same as the old password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "New password cannot be the same as the old password"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User Not Found"
 *       440:
 *         description: Session expired.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Session expired!"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Password Updation Failed"
 */
router.route('/reset-password').put(middleware.verifyUser, controller.resetPassword);

/**
 * @swagger
 * /api/requestblood:
 *   post:
 *     summary: Create a new blood request.
 *     description: Allows a user to request blood for a patient by providing necessary medical details.
 *     tags:
 *       - Blood Requests
 *     security:
 *       - bearerAuth: []  # If authentication is required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - patientName
 *               - bloodGroup
 *               - units
 *               - weight
 *               - urgency
 *               - bloodComponentType
 *               - transfusionDateTime
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *                 description: The email of the requester.
 *               patientName:
 *                 type: string
 *                 example: "John Doe"
 *                 description: Full name of the patient.
 *               bloodGroup:
 *                 type: string
 *                 example: "O+"
 *                 description: The required blood group.
 *               units:
 *                 type: integer
 *                 example: 2
 *                 description: Number of blood units required.
 *               weight:
 *                 type: number
 *                 example: 65
 *                 description: Weight of the patient in kg.
 *               antibodies:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Anti-A", "Anti-B"]
 *                 description: List of antibodies present.
 *               specialRequirements:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Leukocyte-reduced"]
 *                 description: Any special requirements.
 *               medicalReason:
 *                 type: string
 *                 example: "Surgery"
 *                 description: Medical reason for the blood request.
 *               otherMedicalReason:
 *                 type: string
 *                 example: "Rare condition"
 *                 description: Additional medical reason if "Other" is selected.
 *               urgency:
 *                 type: string
 *                 enum: ["Low", "Medium", "High"]
 *                 example: "High"
 *                 description: Urgency level of the request.
 *               bloodComponentType:
 *                 type: string
 *                 enum: ["Whole Blood", "Plasma", "Platelets"]
 *                 example: "Plasma"
 *                 description: The type of blood component required.
 *               allergiesAndReactions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Penicillin Allergy"]
 *                 description: Any allergies or reactions.
 *               hospital:
 *                 type: object
 *                 properties:
 *                   hospitalname:
 *                     type: string
 *                     example: "City Hospital"
 *                     description: Name of the hospital.
 *                   department:
 *                     type: string
 *                     example: "Cardiology"
 *                     description: Department where the patient is admitted.
 *                   patientId:
 *                     type: string
 *                     example: "P12345"
 *                     description: Hospital-assigned patient ID.
 *               transfusionDateTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-10T10:00:00Z"
 *                 description: The scheduled date and time for transfusion.
 *     responses:
 *       201:
 *         description: Blood request created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blood request created successfully"
 *                 request:
 *                   type: object
 *                   description: Details of the created blood request.
 *       400:
 *         description: Validation error (e.g., missing fields, invalid values).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Please provide a medical reason under 'Other'"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while creating the blood request"
 */
router.route('/requestblood').post(middleware.auth, controller.requestblood);

/**
 * @swagger
 * /api/getAllUserEmails/{email}:
 *   get:
 *     summary: Retrieve all user emails excluding the provided one.
 *     description: Fetches a list of users' emails and first names, excluding the specified email.
 *     tags: 
 *       - Users
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: The email to be excluded from the list.
 *     responses:
 *       200:
 *         description: List of users retrieved successfully.
 *       500:
 *         description: Internal Server Error.
 */
router.route('/getAllUserEmails/:email').get(controller.getAllUserEmails);

/**
 * @swagger
 * /api/getbloodrequestinfo/{email}:
 *   get:
 *     summary: Get blood request information by email.
 *     description: Retrieves blood request details associated with the provided email.
 *     tags: 
 *       - Blood Requests
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: Email associated with blood requests.
 *     responses:
 *       200:
 *         description: Blood request details retrieved successfully.
 *       400:
 *         description: Email is required.
 *       404:
 *         description: No blood request found for the provided email.
 *       500:
 *         description: Internal Server Error.
 */
router.route('/getbloodrequestinfo/:email').get(controller.getbloodrequestinfo);

/**
 * @swagger
 * /api/getsinglebloodrequestinfo/{id}:
 *   get:
 *     summary: Get details of a single blood request.
 *     description: Retrieves blood request details for a specific request ID.
 *     tags: 
 *       - Blood Requests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the blood request.
 *     responses:
 *       200:
 *         description: Blood request information retrieved successfully.
 *       400:
 *         description: ID is required.
 *       404:
 *         description: No blood request found for the provided ID.
 *       500:
 *         description: Internal Server Error.
 */
router.route('/getsinglebloodrequestinfo/:id').get(controller.getsinglebloodrequestinfo);

/**
 * @swagger
 * /api/getAllPendingBloodRequests:
 *   get:
 *     summary: Retrieve all pending blood requests.
 *     description: Fetches details of all blood requests that are currently marked as "Pending".
 *     tags: 
 *       - Blood Requests
 *     responses:
 *       200:
 *         description: List of pending blood requests retrieved successfully.
 *       404:
 *         description: No pending blood requests found.
 *       500:
 *         description: Internal Server Error.
 */
router.route('/getAllPendingBloodRequests').get(controller.getAllPendingBloodRequests);

/**
 * @swagger
 * /api/deletebloodrequest/{id}:
 *   post:
 *     summary: Delete a blood request.
 *     description: Deletes a blood request if it is in the "Pending" state.
 *     tags: 
 *       - Blood Requests
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the blood request.
 *     responses:
 *       200:
 *         description: Blood request deleted successfully.
 *       400:
 *         description: Only requests with "Pending" status can be deleted.
 *       404:
 *         description: Blood request not found.
 *       500:
 *         description: An error occurred while deleting the blood request.
 */
router.route('/deletebloodrequest/:id').post(middleware.auth,controller.deletebloodrequest);

/**
 * @swagger
 * /api/updatebloodrequest/{id}:
 *   put:
 *     summary: Update a blood request.
 *     description: Updates the details of an existing blood request based on its ID.
 *     tags:
 *       - Blood Requests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blood request to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               medicalReason:
 *                 type: string
 *                 example: "Accident"
 *               otherMedicalReason:
 *                 type: string
 *                 example: "Severe injury"  
 *               hospital:
 *                 type: object
 *                 properties:
 *                   hospitalname:
 *                     type: string
 *                     example: "City Hospital"
 *                   department:
 *                     type: string
 *                     example: "Emergency"
 *                   patientId:
 *                     type: string
 *                     example: "12345"
 *     responses:
 *       200:
 *         description: Blood request updated successfully.
 *       400:
 *         description: Invalid request or missing required fields.
 *       404:
 *         description: Blood request not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/updatebloodrequest/:id', middleware.auth, controller.updatebloodrequest);

/**
 * @swagger
 * /api/registerbloodbank:
 *   post:
 *     summary: Register a new blood bank.
 *     description: Registers a new blood bank with the required details.
 *     tags:
 *       - Blood Banks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - latitude
 *               - longitude
 *               - phoneNumber
 *               - contactEmail
 *               - bloodBankCode
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Red Cross Blood Bank"
 *               address:
 *                 type: string
 *                 example: "123 Main Street"
 *               city:
 *                 type: string
 *                 example: "Karachi"
 *               state:
 *                 type: string
 *                 example: "Sindh"
 *               latitude:
 *                 type: number
 *                 example: 24.8607
 *               longitude:
 *                 type: number
 *                 example: 67.0011
 *               phoneNumber:
 *                 type: string
 *                 example: "+92 123 456 7890"
 *               contactEmail:
 *                 type: string
 *                 format: email
 *                 example: "bloodbank@example.com"
 *               bloodBankCode:
 *                 type: string
 *                 example: "BB1"
 *     responses:
 *       201:
 *         description: Blood bank registered successfully.
 *       400:
 *         description: Validation error (e.g., duplicate email or missing fields).
 *       500:
 *         description: Internal server error.
 */
router.route('/registerbloodbank').post(controller.registerbloodbank);

/**
 * @swagger
 * /api/getbloodbank:
 *   get:
 *     summary: Retrieve a list of blood banks.
 *     description: Fetches all registered blood banks with relevant details.
 *     tags:
 *       - Blood Banks
 *     responses:
 *       200:
 *         description: List of blood banks retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Red Cross Blood Bank"
 *                   address:
 *                     type: string
 *                     example: "123 Main Street"
 *                   city:
 *                     type: string
 *                     example: "Karachi"
 *                   state:
 *                     type: string
 *                     example: "Sindh"
 *                   bloodBankId:
 *                     type: string
 *                     example: "BB1"
 *                   phoneNumber:
 *                     type: string
 *                     example: "+92 123 456 7890"
 *                   contactEmail:
 *                     type: string
 *                     format: email
 *                     example: "bloodbank@example.com"
 *                   latitude:
 *                     type: number
 *                     example: 24.8607
 *                   longitude:
 *                     type: number
 *                     example: 67.0011
 *       404:
 *         description: No blood banks found.
 *       500:
 *         description: Internal server error.
 */
router.route('/getbloodbank').get(controller.getbloodbank);

/**
 * @swagger
 * /api/setBloodBankAppointmentSchedule:
 *   post:
 *     summary: Set appointment schedule for a blood bank.
 *     description: Defines a blood bank's appointment schedule with one-hour slots.
 *     tags:
 *       - Blood Banks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bloodBankCode
 *               - schedule
 *             properties:
 *               bloodBankCode:
 *                 type: string
 *                 example: "BB1"
 *               schedule:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     day:
 *                       type: string
 *                       example: "Monday"
 *                     timeSlots:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           startTime:
 *                             type: string
 *                             example: "09:00"
 *                           endTime:
 *                             type: string
 *                             example: "17:00"
 *                           maxAppointments:
 *                             type: integer
 *                             example: 10
 *                           bookedAppointments:
 *                             type: integer
 *                             example: 2
 *     responses:
 *       200:
 *         description: Blood bank appointment schedule updated successfully.
 *       400:
 *         description: Invalid request, missing required fields.
 *       404:
 *         description: Blood bank not found.
 *       500:
 *         description: Internal server error.
 */
router.route('/setBloodBankAppointmentSchedule').post(controller.setBloodBankAppointmentSchedule);

/**
 * @swagger
 * /api/getappointmentdetails:
 *   get:
 *     summary: Retrieve appointment schedule for a blood bank.
 *     description: Fetches the available time slots for a specific blood bank on a given day.
 *     tags:
 *       - Blood Banks
 *     parameters:
 *       - in: query
 *         name: bloodBankCode
 *         required: true
 *         schema:
 *           type: string
 *           example: "BB1"
 *         description: The unique code of the blood bank (e.g., BB1, HB4).
 *       - in: query
 *         name: day
 *         required: true
 *         schema:
 *           type: string
 *           example: "Monday"
 *         description: The day of the week for which the schedule is requested.
 *     responses:
 *       200:
 *         description: Availability details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Availability details retrieved successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     timeSlots:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           startTime:
 *                             type: string
 *                             example: "09:00"
 *                           endTime:
 *                             type: string
 *                             example: "17:00"
 *                           maxAppointments:
 *                             type: integer
 *                             example: 10
 *                           bookedAppointments:
 *                             type: integer
 *                             example: 2
 *       400:
 *         description: Missing or invalid parameters (e.g., incorrect blood bank code or invalid day).
 *       404:
 *         description: No schedule found for the given blood bank or day.
 *       500:
 *         description: Internal server error.
 */
router.route('/getappointmentdetails').get(controller.getappointmentschedule); 

/**
 * @swagger
 * /api/updateAppointmentStatus:
 *   put:
 *     summary: Update the appointment status of a user.
 *     description: Updates the status of an appointment based on the user's email. The allowed status values are "Appear", "Not-Appear", or null.
 *     tags: 
 *       - Appointments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - status
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *                 description: Email of the user whose appointment status needs to be updated.
 *               status:
 *                 type: string
 *                 enum: ["Appear", "Not-Appear", null]
 *                 example: "Appear"
 *                 description: The new appointment status.
 *     responses:
 *       200:
 *         description: Appointment status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Appointment status updated successfully."
 *                 appointment:
 *                   type: object
 *                   description: Updated appointment details.
 *       400:
 *         description: Invalid request, missing email or status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email and status are required."
 *       404:
 *         description: Appointment not found for the provided email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Appointment not found for the provided email."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An internal server error occurred."
 */
router.route("/updateAppointmentStatus").put(controller.updateAppointmentStatus);

/**
 * @swagger
 * /api/bookappointment:
 *   post:
 *     summary: Book a blood donation appointment.
 *     description: Schedules an appointment for a user at a blood bank based on availability.
 *     tags:
 *       - Appointments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - email
 *               - phoneNumber
 *               - bloodBankName
 *               - bloodBankId
 *               - timeslot
 *               - date
 *               - day
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               phoneNumber:
 *                 type: string
 *                 example: "1234567890"
 *               bloodBankName:
 *                 type: string
 *                 example: "City Blood Bank"
 *               bloodBankId:
 *                 type: string
 *                 example: "BB1"
 *               timeslot:
 *                 type: string
 *                 example: "09:00-10:00"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-03-05"
 *               day:
 *                 type: string
 *                 example: "Monday"
 *     responses:
 *       201:
 *         description: Appointment booked successfully.
 *       400:
 *         description: Missing or invalid input fields.
 *       404:
 *         description: No availability or timeslot found.
 *       500:
 *         description: Internal server error.
 */
router.route('/bookappointment').post(controller.bookappointment);

/**
 * @swagger
 * /api/getappointmentdetails/{email}:
 *   get:
 *     summary: Get appointment details by email.
 *     description: Fetches all appointments associated with a user's email.
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *           example: "john@example.com"
 *     responses:
 *       200:
 *         description: Appointments retrieved successfully.
 *       400:
 *         description: Email parameter is required.
 *       404:
 *         description: No appointments found for this email.
 *       500:
 *         description: Internal server error.
 */
router.route('/getappointmentdetails/:email').get(controller.getappointmentdetails);

/**
 * @swagger
 * /api/getappointmentdetailsbybloodbank/{bloodBankId}:
 *   get:
 *     summary: Get appointment details by blood bank ID.
 *     description: Fetches all pending appointments for a given blood bank.
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: path
 *         name: bloodBankId
 *         required: true
 *         schema:
 *           type: string
 *           example: "BB1"
 *     responses:
 *       200:
 *         description: Appointments retrieved successfully.
 *       400:
 *         description: Blood Bank ID is required.
 *       404:
 *         description: No appointments found for the specified blood bank.
 *       500:
 *         description: Internal server error.
 */
router.route('/getappointmentdetailsbybloodbank/:bloodBankId').get(controller.getappointmentdetailsbybloodbank);

/**
 * @swagger
 * /api/addinventory:
 *   post:
 *     summary: Add or update blood bank inventory.
 *     description: Adds a new inventory record or updates an existing inventory for a blood bank.
 *     tags:
 *       - Inventory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bloodBankId
 *               - bloodBankName
 *               - inventory
 *             properties:
 *               bloodBankId:
 *                 type: string
 *                 example: "BB1"
 *               bloodBankName:
 *                 type: string
 *                 example: "City Blood Bank"
 *               inventory:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     bloodGroup:
 *                       type: string
 *                       example: "O+"
 *                     units:
 *                       type: number
 *                       example: 5
 *     responses:
 *       200:
 *         description: Inventory updated successfully.
 *       201:
 *         description: Inventory added successfully.
 *       400:
 *         description: Invalid input data.
 *       404:
 *         description: Blood bank not found.
 *       500:
 *         description: Internal server error.
 */
router.route('/addinventory').post(controller.addinventory);

/**
 * @swagger
 * /api/getinventory/{bloodBankId}:
 *   get:
 *     summary: Get inventory by blood bank ID.
 *     description: Fetches the inventory details for a given blood bank.
 *     tags:
 *       - Inventory
 *     parameters:
 *       - in: path
 *         name: bloodBankId
 *         required: true
 *         schema:
 *           type: string
 *           example: "BB1"
 *     responses:
 *       200:
 *         description: Inventory retrieved successfully.
 *       400:
 *         description: Blood bank ID is required.
 *       404:
 *         description: Inventory not found for the specified blood bank.
 *       500:
 *         description: Internal server error.
 */
router.route('/getinventory/:bloodBankId').get(controller.getinventory);

/**
 * @swagger
 * /api/addcampaign:
 *   post:
 *     summary: Add or update a blood donation campaign.
 *     description: Creates a new blood donation campaign or updates an existing one.
 *     tags:
 *       - Campaigns
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bloodBankId
 *               - bloodBankName
 *               - startDateTime
 *               - endDateTime
 *               - venue
 *               - contactDetails
 *             properties:
 *               bloodBankId:
 *                 type: string
 *                 example: "BB1"
 *               bloodBankName:
 *                 type: string
 *                 example: "City Blood Bank"
 *               startDateTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-04-01T10:00:00Z"
 *               endDateTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-04-01T16:00:00Z"
 *               venue:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Community Hall"
 *                   street:
 *                     type: string
 *                     example: "123 Main St"
 *                   city:
 *                     type: string
 *                     example: "Karachi"
 *                   state:
 *                     type: string
 *                     example: "Sindh"
 *               contactDetails:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   phone:
 *                     type: string
 *                     example: "+92-300-1234567"
 *     responses:
 *       201:
 *         description: Blood campaign created successfully.
 *       200:
 *         description: Existing campaign updated successfully.
 *       400:
 *         description: Invalid input or incorrect blood bank name.
 *       404:
 *         description: Blood bank not found.
 *       500:
 *         description: Internal server error.
 */
router.route('/addcampaign').post(controller.addcampaign);

/**
 * @swagger
 * /api/getcampaign:
 *   get:
 *     summary: Get all blood donation campaigns.
 *     description: Retrieves all available blood donation campaigns.
 *     tags:
 *       - Campaigns
 *     responses:
 *       200:
 *         description: Campaigns retrieved successfully.
 *       404:
 *         description: No campaigns found.
 *       500:
 *         description: Internal server error.
 */
router.route('/getcampaign').get(controller.getCampaign);

/**
 * @swagger
 * /api/deleteCampaign:
 *   post:
 *     summary: Delete a blood donation campaign.
 *     description: Deletes a specific blood donation campaign based on the provided details.
 *     tags:
 *       - Campaigns
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bloodBankId
 *               - bloodBankName
 *               - venue
 *               - startDateTime
 *               - endDateTime
 *             properties:
 *               bloodBankId:
 *                 type: string
 *                 example: "BB1"
 *               bloodBankName:
 *                 type: string
 *                 example: "City Blood Bank"
 *               venue:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Community Hall"
 *                   street:
 *                     type: string
 *                     example: "123 Main St"
 *                   city:
 *                     type: string
 *                     example: "Karachi"
 *                   state:
 *                     type: string
 *                     example: "Sindh"
 *               startDateTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-04-01T10:00:00Z"
 *               endDateTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-04-01T16:00:00Z"
 *     responses:
 *       200:
 *         description: Campaign deleted successfully.
 *       400:
 *         description: Missing required fields or invalid dates.
 *       404:
 *         description: Campaign not found.
 *       500:
 *         description: Internal server error.
 */
router.route('/deleteCampaign').post(controller.deleteCampaign);

/**
 * @swagger
 * /api/getcampaignByBloodBank/{bloodBankId}:
 *   get:
 *     summary: Get blood donation campaigns for a specific blood bank.
 *     description: Fetches all blood donation campaigns associated with a given blood bank ID.
 *     tags:
 *       - Campaigns
 *     parameters:
 *       - in: path
 *         name: bloodBankId
 *         required: true
 *         schema:
 *           type: string
 *           example: "BB1"
 *     responses:
 *       200:
 *         description: Campaigns retrieved successfully.
 *       400:
 *         description: Blood bank ID is required.
 *       404:
 *         description: No campaigns found for the specified blood bank.
 *       500:
 *         description: Internal server error.
 */
router.route('/getcampaignByBloodBank/:bloodBankId').get(controller.getCampaignByBloodBank);








// SWAGEER ENDING












//PUT FOR BLOOD BANK
router.route('/updateAppointmentStatus').put(controller.updateAppointmentStatus);

 
//POST FOR BLOOD BANK
router.route('/registerbloodbank').post(controller.registerbloodbank); //Admin work
router.route('/setBloodBankAppointmentSchedule').post(controller.setBloodBankAppointmentSchedule); //Blood Bank does 
router.route('/addinventory').post(controller.addinventory);//Blood Bank Does
router.route('/addcampaign').post(controller.addcampaign);//Blood Bank Does
router.route('/deleteCampaign').post(controller.deleteCampaign);//Blood Bank Does

// GET METHOD FOR BLOOD BANK 
router.route('/getbloodbank').get(controller.getbloodbank); //User Does
router.route('/getappointmentdetails').get(controller.getappointmentschedule); //User Does
router.route('/getappointmentdetailsbybloodbank/:bloodBankId').get(controller.getappointmentdetailsbybloodbank);//Blood Bank does
router.route('/getinventory/:bloodBankId').get(controller.getinventory);//Blood Bank Does
router.route('/getcampaign').get(controller.getCampaign);
router.route('/getcampaignByBloodBank/:bloodBankId').get(controller.getCampaignByBloodBank);

// POST Methods FOR USER 
router.route('/registerCheck').post(controller.registerCheck);
router.route('/register').post(controller.register);
router.route('/test').get((req, res) => res.status(200).send('Test route works!'));
router.route('/send-mail').post(sendMail);
router.route('/authenticate').post(middleware.verifyUser, (req, res) => res.end());
router.route('/login').post(controller.login);
router.route('/requestblood').post(middleware.auth,controller.requestblood);
router.route('/deletebloodrequest/:id').post(middleware.auth,controller.deletebloodrequest);
router.route('/bookappointment').post(controller.bookappointment);

 
// GET Methods FOR USER
router.route('/user/:email').get(controller.getUser);
router.route('/fetchuser/:id').get(controller.getfetchUser);
router.route('/getAllUserEmails/:email').get(controller.getAllUserEmails);
router.route('/getbloodrequestinfo/:email').get(controller.getbloodrequestinfo);
router.route('/getsinglebloodrequestinfo/:id').get(controller.getsinglebloodrequestinfo);
router.route('/getAllPendingBloodRequests').get(controller.getAllPendingBloodRequests);
router.route('/getappointmentdetails/:email').get(controller.getappointmentdetails);

//change in this both FOR ALL
router.route('/generate-otp').get( controller.generateOTP);
router.route('/verify-otp').get(controller.verifyOTP);
router.route('/create-reset-session').get(controller.createResetSession);

// PUT Methods
router.route('/update-user').put(middleware.auth, controller.updateUser);
router.put('/updatebloodrequest/:id', middleware.auth, controller.updatebloodrequest);
router.route('/reset-password').put(middleware.verifyUser, controller.resetPassword);

// Auto generate 
router.route('/archivePastCampaigns').post(controller.archivePastCampaigns);

export default router; 