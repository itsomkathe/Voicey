const UserModel = require('../models/UserModel');
class UserService{
    async findUser(condition){
        try{
            const user = await UserModel.findOne(condition).select('name username phone _id picture');
            return user;
        }catch(err){
            return new Error(err.message);
        }
    }
    async createUser(data){
        try{
            const user = UserModel.create(data);
            return user;
        }catch(err){
            return new Error(err.message);
        }
    }
    async findForSignIn(username){
        try{
            const user = await UserModel.findOne({username}).select('name username phone _id picture password');
            return user;
        }catch(err){
            return new Error(err.message);
        }
    }
    async addPicture(id, image){
        try{
            const user = await UserModel.findByIdAndUpdate(id, {picture: image}, {new: true});
            return user;
        }catch(err){
            return new Error(err.message);
        }
    }
}

module.exports = new UserService();