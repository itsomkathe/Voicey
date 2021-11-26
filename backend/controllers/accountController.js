const UserService = require('../services/userService');
const HashingService = require('../services/hashingService');
const TokenService = require('../services/tokenService');
class AccountController{
    async createAccount(req, res){
        const {phone, username, password, name} = req.body;
        try{
            const existing = await UserService.findUser({$or:[{phone},{username}]});
            if(existing){
                return res.json({error: "Account already exists"});
            }
            const hashedPassword = await HashingService.hashPassword(password);
            const userData = await UserService.createUser({phone, username, password:hashedPassword, name});
            const accessToken = await TokenService.createAccessToken({phone, username});
            res.cookie('accessToken', accessToken, {
                maxAge: 1000*60*60*24*7,
                httpOnly: true
            });
            res.json(userData);
            
        }catch(err){
            res.json({error: "Internal server error"});
        }
    }

    async getProfile(req, res){

    }
}

module.exports = new AccountController();