const express = require('express')
const router = express.Router();
const AuthController = require('./controllers/authController');
const AccountController = require('./controllers/accountController');
const AuthMiddleware = require('./middleware/auth-middleware');

router.post('/api/send-otp', AuthController.sendOTP);

router.post('/api/verify-otp', AuthController.verifyOTP);

router.post('/api/createaccount', AuthMiddleware, AccountController.createAccount);

module.exports = router;

