const otpService = require('../services/otpService');
const hashingService = require('../services/hashingService');
class AuthController{
    async sendOTP(req,res){
        const {number} = req.body;
        if(!number) res.status(400).send('Add phone number');
        const otp = await otpService.generateOTP();
        const time = 1000*60*5;
        const expireAt = Date.now() + time;
        const data = `${number}#${otp}#${expireAt}`;
        const hash  = await hashingService.hashOTP(data);
        return res.json({data: hash});
    }
}

module.exports = new AuthController();