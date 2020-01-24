const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 1
    },
    email: {
        type: String,
        unique: true
    }

});

const User = mongoose.model('User', userSchema);
module.exports = User;