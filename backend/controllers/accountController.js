const UserService = require('../services/userService');
const HashingService = require('../services/hashingService');
const TokenService = require('../services/tokenService');
class AccountController{
    async createAccount(req, res){
        const {phone, username, password, name} = req.body;
        try{
            const existing = await UserService.findUser({$or:[{phone},{username}]});
            if(existing){
                throw new Error("Account already exists");
            }
            const hashedPassword = await HashingService.hashPassword(password);
            const userData = await UserService.createUser({phone, username, password:hashedPassword, name});
            const accessToken = await TokenService.createAccessToken({phone, username, _id: userData._id});
            res.clearCookie('verificationToken');
            res.cookie('accessToken', accessToken, {
                maxAge: 1000*60*60*24*7,
                httpOnly: true
            });
            res.json(userData);
        }catch(err){
            res.status(401).json({error: err.message ? err.message: "Internal Server Error"});
        }
    }

    async getProfile(req, res){
        try{
            const { _id } = req.user;
            const user = await UserService.findUser({_id});
            if(!user){
                throw new Error("No user exists");
            }
            res.json(user);
        }catch(err){
            res.status(401).json({error: err.message ? err.message : "User error"})
        }
    }
}

module.exports = new AccountController();