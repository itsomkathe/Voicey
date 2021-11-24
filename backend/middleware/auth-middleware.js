const tokenService = require('../services/tokenService');
module.exports = async (req, res, next)=>{
    try{
        const { verificationToken } = req.cookies;
        if(!verificationToken){
            throw new Error("Session Expired");
        }
        const data = await tokenService.checkVerificationToken(verificationToken);
        if(!data){
            throw new Error("Failed to verify");
        }
        
        if(data.exp < Date.now()){
            throw new Error("Session Expired");
        }
        req.user = data;
        next();
    }catch(err){
        res.status(401).json({error: err.message})
    }
}