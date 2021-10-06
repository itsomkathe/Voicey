const express = require('express')
const router = express.Router();
const AuthController = require('./controllers/authController');

router.post('/api/send-otp', AuthController.sendOTP);



module.exports = router;

