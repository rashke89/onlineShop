const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    firstName: { type: String, required: Boolean },
    lastName: { type: String, required: Boolean },
    email: { type: String, required: Boolean },
    message: { type: String, required: Boolean }
});

const EmailModel = mongoose.model('email', emailSchema);

module.exports = EmailModel;
