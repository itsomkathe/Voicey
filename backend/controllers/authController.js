const otpService = require('../services/otpService');
const hashingService = require('../services/hashingService');
const userService = require('../services/userService');

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
        if(Date.now() > parseInt(expireAt)){
            return res.staus(400).json({message: "OTP Expired"});
        }

        const data = `${number}#${otp}#${expireAt}`;
        const isValid = await otpService.verify(hashedOTP, data);
        if(!isValid){
            return res.staus(400).json({message: "OTP Expired"});
        }

        let user;
        try{
            user = await userService.findUser({phone: number});
            if(user){
                return res.status(400).json({message: "user with given number already exists"})
            }
            try{
                await userService.createUser({phone: number})
            }catch(err){
                console.log(err);
                return res.status(500).json({message: "Internal server error, could not create account"})
            }
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = new AuthController();
