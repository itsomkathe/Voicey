const UserModel = require('../models/UserModel');
class UserService{
    async findUser(condition){
        const user = await UserModel.findOne(condition);
        return user;
    }
    async createUser(data){
        const user = UserModel.create(data);
        return user;
    }
}

module.exports = new UserService();