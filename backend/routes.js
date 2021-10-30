const express = require('express')
const router = express.Router();
const AuthController = require('./controllers/authController');
const AccountController = require('./controllers/accountController');

router.post('/api/send-otp', AuthController.sendOTP);

router.post('/api/verify-otp', AuthController.verifyOTP);

router.post('/api/createaccount', AccountController.createAccount);

module.exports = router;

