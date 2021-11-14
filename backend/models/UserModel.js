const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    name:{
        type: String,
        required:true
    },
    phone: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required:true
    },
    picture:{
        type: String
    }
},{
    timestamps : true
});

module.exports = mongoose.model('User',userSchema,'users');