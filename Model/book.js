const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Type = require('./type');
const Admin = require('./admin')

const book = new Schema({
    name: String,
    type:  [{type: Schema.Types.ObjectId, ref:'Type'}],
    author: String,
    img: String,
    user_id: {type: Schema.Types.ObjectId, ref: 'Admin'}
});

module.exports = mongoose.model('Book', book);