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
        type: String
    },
    phone: {
        type: String,
        required:true
    },
    username: {
        type: String
    },
    isComplete: {
        type: Boolean,
        default: false
    }
},{
    timestamps : true
});

module.exports = mongoose.model('User',userSchema,'users');