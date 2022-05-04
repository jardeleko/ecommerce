const router = require('express').Router()
const Order = require('../models/Order')
const User = require('../models/User')

const {verifyToken, verifyTokenAuth, verifyTokenAdmin} = require('./verifyToken')

//CHECKED TRUE

//GET USER ORDERS OK
router.get("/find/:userId", verifyTokenAuth, async (req, res) => {
    try {
        const orders = await Order.find({userId: req.params.userId})
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

// GET ALL OK
router.get("/", verifyTokenAdmin, async (req, res) => {
    try {
        const orders = await Order.find() 
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET MONTHLY INCOME OK
router.get("/income", verifyTokenAdmin, async (req, res) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-2))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() -2))
    
    try {
        const income = await Order.aggregate([
            {   $match: {createdAt:{$gte: previousMonth}}},
            {
                $project:{
                    month: {$month: "$createdAt"},
                    sales: "$amount",
                },
            },
            {
                $group:{
                    _id:"$month",
                    total: { $sum: "$sales" },
                },
            }
        ])
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json(error)    
    }
})

//CREATE ORDER OK
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)
    const client = await User.find({_id : req.body.userId})
    if(client.length === 0){
        res.status(500).json("User not exists on DB!")
    }
    else {
        try {
            const savedOrder = await newOrder.save();
            res.status(200).json(savedOrder)
        } catch (error) {
            res.status(500).json(error)
        }
    }
})

//UPDATE ORDER OK
router.put("/:id", verifyTokenAdmin, async (req, res) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body, 
        }, {new:true})
        res.status(200).json(updateOrder)
    }catch(err){
        res.status(500).json(err)
    }
})

//delete ORDER OK
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted order!")
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
