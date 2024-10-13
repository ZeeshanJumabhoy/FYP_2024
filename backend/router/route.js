import { Router } from 'express';

// Import all controllers
import * as controller from '../controllers/appcontroller.js';
import * as middleware from '../middleware/middleware.js';
import sendMail from '../controllers/mailer.js'; 

const router = Router();

// POST Methods  
router.route('/registercheck').post(controller.registercheck);
router.route('/register').post(controller.register);
router.route('/test').get((req, res) => res.status(200).send('Test route works!'));
router.route('/send-mail').post(sendMail);
router.route('/authenticate').post(middleware.verifyUser, (req, res) => res.end());
//router.route('/login').post((req, res) => res.status(200).send('Login Route Works!'));
router.route('/login').post(controller.login);

// GET Methods
router.route('/user/:email').get(controller.getUser);
router.route('/fetchuser/:id').get(controller.getfetchUser);
//change in this both
router.route('/generate-otp').get( controller.generateOTP);
router.route('/verify-otp').get(controller.verifyOTP);
router.route('/create-reset-session').get(controller.createResetSession);

// PUT Methods
router.route('/update-user').put(middleware.auth, controller.updateUser);
router.route('/reset-password').put(middleware.verifyUser, controller.resetPassword);

export default router;