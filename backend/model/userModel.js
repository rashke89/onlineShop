const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: Boolean },
    password: { type: String, required: Boolean },
    email: { type: String, required: Boolean },
    isAdmin: { type: String, required: Boolean, default: false},
    isActive: { type: String, required: Boolean, default: false},
    firstName: { type: String },
    lastName: { type: String },
    avatar: { type: String },
    gender: { type: String },
    address: { type: String },
    city: { type: String },
    postCode: { type: String },
    phoneNumber: { type: Number }
});

const UsersModel = mongoose.model('users', userSchema);

module.exports = UsersModel;