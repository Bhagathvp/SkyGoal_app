const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    is_admin: {
        type: Number,
        default: 0,
        required: true  //if want to provide admin can set this to 1
    },
    is_verified: {
        type: Number,
        default: 1,
        required: true
    },
    imageUrl: {
        type: String,
        default:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/-Insert_image_here-.svg/2560px--Insert_image_here-.svg.png',
        required: true
    }

})

module.exports = mongoose.model('user', userSchema)