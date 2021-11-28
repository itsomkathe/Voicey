const tokenService = require('../services/tokenService');
module.exports = async (req,res,next)=>{
    try{
        const { accessToken } = req.cookies;
        if(!accessToken){
            throw new Error("Login again, session expired");
        }
        const data = await tokenService.verifyAccessToken(accessToken);
        if(!data){
            throw new Error("Invalid access token");
        }
        if(data.exp < parseInt(Date.now()/1000)){
            throw new Error("Session Expired");
        }
        req.user = data;
        next();
    }catch(err){
        res.status(401).json({error: err.message ? err.message : "Internal Server Error"});
    }
}