const otpService = require("../services/otpService");
const hashingService = require("../services/hashingService");

class AuthController {
    async sendOTP(req, res) {
        const { number } = req.body;
        if (!number) res.status(400).send("Add phone number");
        const otp = await otpService.generateOTP();
        const time = 1000 * 60 * 5;
        const expireAt = Date.now() + time;
        const data = `${number}#${otp}#${expireAt}`;
        const hash = await hashingService.hashOTP(data);

        try {
            await otpService.sendAsText(number, otp);
            return res.json({ hash: `${hash}#${expireAt}`, number: number });
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }

    async verifyOTP(req, res){
        const{number, otp, hash} = req.body;
        if(!otp || !number || !hash){
            return res.staus(400).json({message: "All fields are required"});
        }
        const [hashedOTP, expireAt] = hash.split("#");
        if(Date.now() > expireAt){
            return res.staus(400).json({message: "OTP Expired"});
        }

        const data = `${number}#${otp}#${expireAt}`;
        const isValid = await otpService.verify(hashedOTP, data);
        if(!isValid){
            return res.staus(400).json({message: "OTP Expired"});
        }
    }
}

module.exports = new AuthController();
