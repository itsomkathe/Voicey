const UserModel = require('../models/UserModel');
class UserService{
    async findUser(condition){
        const user = await UserModel.findOne(condition).select('name username phone _id picture');
        return user;
    }
    async createUser(data){
        const user = UserModel.create(data);
        return user;
    }
    async findForSignIn(username){
        const user = await UserModel.findOne({username}).select('name username phone _id picture password');
        return user;
    }
}

module.exports = new UserService();