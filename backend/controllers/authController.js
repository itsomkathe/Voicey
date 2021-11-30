const otpService = require("../services/otpService");
const hashingService = require("../services/hashingService");
const userService = require("../services/userService");
const tokenService = require("../services/tokenService");
const { addListener } = require("../models/UserModel");

class AuthController {
    async sendOTP(req, res) {
        const { phone } = req.body;
        if (!phone) return res.status(400).send("Add phone number");
        const otp = await otpService.generateOTP();
        const time = 1000 * 60 * 5;
        const expireAt = Date.now() + time;
        const data = `${phone}#${otp}#${expireAt}`;
        const hash = await hashingService.hashOTP(data);

        try {
            let user;
            user = await userService.findUser({ phone: phone });
            if (user) {
                throw new Error("User with given number already exists");
            }
            //await otpService.sendAsText(number, otp);
            res.json({ hash: `${hash}#${expireAt}`, phone: phone, otp: otp });
        } catch (err) {
            return res
                .status(401)
                .json({
                    error: err.message ? err.message : "Internal Server Error",
                });
        }
    }

    async verifyOTP(req, res) {
        const { phone, otp, hash } = req.body;
        try {
            if (!otp || !phone || !hash) {
                throw new Error("All fields are required");
            }
            const [hashedOTP, expireAt] = hash.split("#");

            if (Date.now() > parseInt(expireAt)) {
                throw new Error("OTP Expired");
            }

            const data = `${phone}#${otp}#${expireAt}`;
            const isValid = await otpService.verify(hashedOTP, data);
            if (!isValid) {
                throw new Error("Incorrect OTP");
            }

            const verificationToken = tokenService.createVerificationToken({
                phone: phone,
            });
            res.cookie("verificationToken", verificationToken, {
                maxAge: 1000 * 60 * 60 * 60,
                httpOnly: true,
            });
            res.json({ flag: true });
        } catch (err) {
            return res
                .status(401)
                .json({
                    error: err.message ? err.message : "Internal Server Error",
                });
        }
    }

    async signIn(req, res) {
        const { username, password } = req.body;
        try {
            if (!username || !password) {
                throw new Error("All fields are required");
            }

            let user = await userService.findForSignIn(username);
            if (!user) {
                throw new Error("Incorrect Username");
            }

            const hashedPassword = await hashingService.hashPassword(password);
            if (user.password !== hashedPassword) {
                throw new Error("Incorrect Password");
            }

            user.password = undefined;
            const accessToken = await tokenService.createAccessToken({
                phone: user.phone,
                username: user.username,
                _id: user._id,
            });
            res.cookie("accessToken", accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
            });
            res.json(user);
        } catch (err) {
            return res
                .status(401)
                .json({
                    error: err.message ? err.message : "Internal Server Error",
                });
        }
    }
}

module.exports = new AuthController();
