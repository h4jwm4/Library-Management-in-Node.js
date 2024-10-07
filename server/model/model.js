const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    gender : String,
    status : String
})

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        validate: {
          validator: (value) => {
            // Validate phone number format
            const phoneRegex = /^\d{12}$/;
            return phoneRegex.test(value);
          },
          message: 'Invalid phone number format'
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
          validator: (value) => {
            // Validate email format
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return emailRegex.test(value);
          },
          message: 'Invalid email format'
        }
    },
})

const Userdb = mongoose.model('userdb', schema);
const Member = mongoose.model('Member', memberSchema);

module.exports = { Userdb, Member};