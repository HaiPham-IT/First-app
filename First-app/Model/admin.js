const mongoose = require('mongoose')

const admin = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'UserName is required'],
        unique: true
    },
    pass: {
        type: String,
        required: [true, 'Password is required'],
    },
    information: {
        fullName: {
            type: String
        },
        age: {
            type: Number,
            default: ""
        },
        img: {
            type: String,
            default: ""
        },
        dayOfBirth: {
            type: Date,
            default: ""
        },
        phoneNumber: {
            type: String,
            validate: {
                validator: (v)=>{
                    return /(09|01[2|6|8|9])+([0-9]{8})\b/g.test(v)
                },
                message: props => `${props.value} is not a valid phone number`
            },
            default: ""
        },
        address: {
            type: String,
            default: ""
        },
    }
})

module.exports = mongoose.model('Admin', admin);