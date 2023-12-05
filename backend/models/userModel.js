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
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbBEzSEpERLmcHGnkp_Gdimsc_a_e_VD2tZWmYsvUvSQ&s',
        required: true
    }

})

module.exports = mongoose.model('user', userSchema)