const tokenService = require('../services/tokenService');
module.exports = async (req, res, next)=>{
    try{
        const { verificationToken } = req.cookies;
        if(!verificationToken){

            throw new Error();
        }
        const data = await tokenService.checkVerificationToken(verificationToken);
        if(!data){
            throw new Error();
        }
        req.user = data;
        next();
    }catch(err){
        res.json({error: "Verification failed"})
    }
}