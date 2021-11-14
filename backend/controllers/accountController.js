const UserService = require('../services/userService');
const HashingService = require('../services/hashingService');

class AccountController{
    async createAccount(req, res){
        const {phone, username, password, name} = req.body;
        try{
            const existing = await UserService.findUser({$or:[{phone},{username}]});
            console.log(existing);
            if(existing){
                return res.json({error: "Account already exists"});
            }
            const hashedPassword = await HashingService.hashPassword(password);
            const userData = await UserService.createUser({phone, username, password:hashedPassword, name});
            res.json(userData);
        }catch(err){
            res.json({error: "Internal server error"});
        }
    }
}

module.exports = new AccountController();