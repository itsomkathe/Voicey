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
}

module.exports = new UserService();