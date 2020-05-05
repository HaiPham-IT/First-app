const mongoose = require('mongoose')

const type = new mongoose.Schema({
    name: String
})

module.exports = mongoose.model('Type', type)