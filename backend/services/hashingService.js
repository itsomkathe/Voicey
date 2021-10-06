const crypto = require('crypto')
class HashingService{
    async hashOTP(data){
        const hashedOTP = await crypto.createHmac('sha512', process.env.HASH).update(data).digest('hex');
        return hashedOTP;
    }
}

module.exports =  new HashingService();