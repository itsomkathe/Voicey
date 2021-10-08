const express = require('express')
const router = express.Router();
const AuthController = require('./controllers/authController');

router.post('/api/send-otp', AuthController.sendOTP);

router.post('/api/verify-otp', AuthController.verifyOTP);

module.exports = router;

