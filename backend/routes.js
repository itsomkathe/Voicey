const express = require('express')
const router = express.Router();
const AuthController = require('./controllers/authController');
const AccountController = require('./controllers/accountController');
const AuthMiddleware = require('./middleware/auth-middleware');
const AccessMiddleware = require('./middleware/access-middleware');

router.post('/api/send-otp', AuthController.sendOTP);

router.post('/api/verify-otp', AuthController.verifyOTP);

router.post('/api/createaccount', AuthMiddleware, AccountController.createAccount);

router.get('/api/refresh', AccessMiddleware, AccountController.getProfile);

router.post('/api/signin', AuthController.signIn);

router.post('/api/addphoto', AccessMiddleware, AccountController.addPhoto);

module.exports = router;

