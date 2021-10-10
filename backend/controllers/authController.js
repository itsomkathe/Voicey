const otpService = require('../services/otpService');
const hashingService = require('../services/hashingService');
const userService = require('../services/userService');
const tokenService = require('../services/tokenService');
class AuthController {
    async sendOTP(req, res) {
        const { number } = req.body;
        if (!number) return res.status(400).send("Add phone number");
        const otp = await otpService.generateOTP();
        const time = 1000 * 60 * 5;
        const expireAt = Date.now() + time;
        const data = `${number}#${otp}#${expireAt}`;
        const hash = await hashingService.hashOTP(data);

        try {
            await otpService.sendAsText(number, otp);
            res.json({ hash: `${hash}#${expireAt}`, number: number });
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
            return res.staus(400).json({message: "Incorrect OTP"});
        }

        let user;
        try{
            user = await userService.findUser({phone: number});
            if(user){
                return res.status(400).json({message: "User with given number already exists"});
            }
        }catch(err){
            console.log(err);
            return res.status(500).json({message: "Internal server error"});
        }

        //const {accessToken, refreshToken} = tokenService.createToken({id: user._id});
        const authToken = tokenService.createAuthToken({phone: number});
        res.cookie('authtoken', authToken, {
            maxAge: 1000*60*60,
            httpOnly: true
        });
        res.json({message: "Cookie Sent"})
        /*  res.cookie('refreshtoken', refreshToken, {
            maxAge: 1000*60*60*24*30,
            httpOnly: true
        });
        res.json({accessToken}) */
    }
}

module.exports = new AuthController();
