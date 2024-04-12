const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    role: {
        type: String,
        required : true,
        default: "NORMAL",
    },
    password: {
        type: String,
        required: true,
    }
},{timestamps : true});

const user = mongoose.model("user",userSchema);

module.exports = user;
