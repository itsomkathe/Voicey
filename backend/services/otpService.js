const otpGenerator = require('otp-generator');
const hashingService = require('./hashingService');
const smsID = process.env.SMS_ID;
const smsAuth = process.env.SMS_AUTH;
const smsSender = process.env.SMS_SENDER;

const twilio = require('twilio')(smsID, smsAuth, {
    lazyLoading: true
});

class OTPService{
    async generateOTP(){
        const otp = otpGenerator.generate(4, {digits:true, upperCase: false, specialChars: false, alphabets:false});
        return otp;
    }

    async sendAsText(phoneNumber, otp){
        return await twilio.messages.create({
            to: phoneNumber,
            from: smsSender,
            body: `Your voicey OTP is ${otp}`
        });
    }
    
    sendAsMail(){

    }

    async verify(hashedOTP, data){
        const toVerify = await hashingService.hashOTP(data);
        if(hashedOTP === toVerify){
            return true;
        }else{
            return false;
        }
    }
}

module.exports = new OTPService();