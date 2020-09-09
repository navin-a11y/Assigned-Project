const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema=mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    no_of_orders:{
        type: Number,
        default: 0
    },
    password: String
})

const User=mongoose.model("User", userSchema);

exports.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

