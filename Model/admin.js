const mongoose = require('mongoose')

const admin = new mongoose.Schema({
    username: String,
    pass: String,
    information:{
        fullName: String,
        age: Number,
        img: String,
        dayOfBirth: Date,
        phoneNumber: String,
        address: String
    }
})

module.exports = mongoose.model('Admin', admin);