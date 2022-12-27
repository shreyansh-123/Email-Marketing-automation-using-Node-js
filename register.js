const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
}, {timestamps: true})

const data = mongoose.model('user', User);
module.exports = data;
