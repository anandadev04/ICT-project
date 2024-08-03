const mongoose = require('mongoose');
const registerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    eventName: { type: String, required: true },
});

const RegisterData = mongoose.model('registerdatas', registerSchema);
module.exports = RegisterData;
