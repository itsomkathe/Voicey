const otpGenerator = require('otp-generator');
class OTPService{
    async generateOTP(){
        const otp = otpGenerator.generate(4, {digits:true, upperCase: false, specialChars: false, alphabets:false});
        return otp;
    }

    sendAsText(){

    }
    
    sendAsMail(){

    }

    verify(){

    }
}

module.exports = new OTPService();