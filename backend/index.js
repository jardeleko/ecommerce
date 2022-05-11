const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const stripeRoute = require('./routes/stripe')
const path = require('path')
const cors = require('cors')


app.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname+'/views/doc.html'));
})

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(() => 
        console.log("DB connect successfull")
    ).catch((err) => {
       console.log("Error Connection, exception:", err)
    })

app.use(cors())
app.use(express.json())
app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/products",productRoute)
app.use("/api/cart",cartRoute)
app.use("/api/orders",orderRoute)
app.use("/api/checkout",stripeRoute)


app.listen(process.env.PORT || 3030, () => {
    try{
        console.log("Server running in", 3030)
    }
    catch(err){
        console.log("Server not running, status problem:" +err)
    }
})

//