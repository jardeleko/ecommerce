const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String, 
            required: true        
        },
        products: [
            {
                productName: {
                    type:String,
                },
                productId: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1, 
                },
            },
        ],
        amount: {
            type:Number, 
            required: true
        },
        address: {
            type: Object, 
            required: true
        },
        status: {
            type: String,
            default: "pending"
        },
        feedback: {
            type: String,
            default: "temporary"
        }
    }, 
    {timestamps:true}
)

module.exports = mongoose.model("Order", orderSchema)

//418