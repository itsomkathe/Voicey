const tokenService = require('../services/tokenService');
module.exports = async (req, res, next)=>{
    try{
        const { verificationToken } = req.cookies;
        console.log(verificationToken);
        if(!verificationToken){
            throw new Error();
        }
        const data = await tokenService.checkVerificationToken(verificationToken);
        console.log(data);
        if(data){
            throw new Error();
        }
        req.user = data;
    }catch(err){
        res.json({error: "Verification failed"})
    }
}