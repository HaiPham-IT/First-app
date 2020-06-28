const mongoose = require('mongoose')

const type = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Type name is required'],
        unique: true
    }
})

module.exports = mongoose.model('Type', type)