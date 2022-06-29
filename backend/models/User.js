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
            default: 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar.png'
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        phone: {
            type: String,
        },
        address: [
            {
                street: {
                    type:String,
                },
                code: {
                    type: String,
                },
                comp: {
                    type: String,
                },
                city: {
                    type: String,
                }
            },
        ],
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