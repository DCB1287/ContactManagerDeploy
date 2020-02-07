const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    user: {
        type: String,
        minlength: 1,
        require: true,
    },

    name: {
        type: String,
        minlength: 1
    },   
    cellphone: {
        type: String,
    },

    homephone: {
        type: String,
    },

    workphone: {
        type: String,
    },
    
    email: {
        type: String,
    },

});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;