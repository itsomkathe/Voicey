const otpService = require('../services/otpService');
const hashingService = require('../services/hashingService');
const userService = require('../services/userService');
const tokenService = require('../services/tokenService');

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
            user = await userService.findUser({phone: phone});
            if(user){
                throw new Error("User with given number already exists");
            }
            //await otpService.sendAsText(number, otp);
            res.json({ hash: `${hash}#${expireAt}`, phone: phone, otp: otp });
        } catch (err) {
            return res.status(401).json({ error: err.message ? err.message : "Internal Server Error" });
        }
    }

    async verifyOTP(req, res){
        const { phone, otp, hash} = req.body;
        if(!otp || !phone || !hash){
            return res.staus(400).json({error: "All fields are required"});
        }
        const [hashedOTP, expireAt] = hash.split("#");
        if(Date.now() > parseInt(expireAt)){
            return res.status(406).json({error: "OTP Expired"});
        }

        const data = `${phone}#${otp}#${expireAt}`;
        const isValid = await otpService.verify(hashedOTP, data);
        if(!isValid){
            return res.status(406).json({error: "Incorrect OTP"});
        }

        const verificationToken = tokenService.createVerificationToken({phone: phone});
        res.cookie('verificationToken', verificationToken, {
            maxAge: 1000*60*60*60,
            httpOnly: true
        });
        res.json({flag: true});
    }
}

module.exports = new AuthController();
