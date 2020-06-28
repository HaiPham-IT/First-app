const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Type = require('./type');
const Admin = require('./admin')

const book = new Schema({
    name: {
        type: String,
        required: [true, 'missing name']
    },
    type:  [{
        type: Schema.Types.ObjectId, 
        ref:'Type',
        required: [true, 'missing type']
    }],
    author: {
        type: String,
        default: ""
    },
    img: {
        type: String,
        default: ""
    },
    user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Admin',
        required: [true, 'missing user']
    },
    trade_list: [{
        type: Schema.Types.ObjectId,
        ref: 'Book',
    }]
});

module.exports = mongoose.model('Book', book);