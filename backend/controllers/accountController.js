const UserService = require('../services/userService');
const HashingService = require('../services/hashingService');
const TokenService = require('../services/tokenService');
const path = require('path');
const jimp = require('jimp');
const fs = require('fs');

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

    async addPhoto(req, res){
        const { _id } = req.user;
        const { picture } = req.body;
        const imagePath = `${Date.now()}-${Math.round(
            Math.random()*1e9
        )}.png`;
        const buffer = Buffer.from(
            picture.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
            'base64'
        );
        const base64Data = picture.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        try{
            console.log(base64Data)
            fs.writeFileSync(path.resolve(__dirname, `../storage/${imagePath}`), base64Data,  {encoding: 'base64'});
            const user = await UserService.addPicture(_id, `/storage/${imagePath}`);
            res.json({picture: user.picture});
        }catch(err){
            res.status(401).json({error: err.message ? err.message : "Internal Server Error"});
        }
    }
}

module.exports = new AccountController();