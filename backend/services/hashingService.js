const crypto = require('crypto')
class HashingService{
    async hashOTP(data){
        const hashedOTP = await crypto.createHmac('sha512', process.env.HASH).update(data).digest('hex');
        return hashedOTP;
    }

    async hashPassword(password){
        const hashedPassword = await crypto.createHmac('sha256', process.env.HASH).update(password).digest('hex');
        return hashedPassword;
    }
}

module.exports =  new HashingService();