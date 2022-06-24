const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String, 
            required: true,
            unique: true
        },
        username: {
            type: String, 
            required: true,
            unique: true
        },
        img: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        gender: {
            type: String,
            default:'secret',
        },
        password: {
            type: String,
            required:true
        },
        isAdmin: {
            type:Boolean,
            default:false
        },
    }, 
    {timestamps:true}
)

module.exports = mongoose.model("User", userSchema)