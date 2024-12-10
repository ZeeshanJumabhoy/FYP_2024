import { Router } from 'express';

// Import all controllers
import * as controller from '../controllers/appcontroller.js';
import * as middleware from '../middleware/middleware.js';
import sendMail from '../controllers/mailer.js'; 

const router = Router();

//PUT FOR BLOOD BANK
router.route('/updateAppointmentStatus').put(controller.updateAppointmentStatus);
router.route('/deletecampaign').delete(controller.deleteCampaign);//Blood Bank Does

//POST FOR BLOOD BANK
router.route('/registerbloodbank').post(controller.registerbloodbank); //Admin work
router.route('/appointmentavailblity').post(controller.appointmentavailblity); //Blood Bank does 
router.route('/addinventory').post(controller.addinventory);//Blood Bank Does
router.route('/addcampaign').post(controller.addcampaign);//Blood Bank Does

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
router.route('/bookappointment').post(middleware.auth,controller.bookappointment);

 
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

export default router; 