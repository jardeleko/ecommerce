const router = require('express').Router()
const { updateOne } = require('../models/User')
const User = require('../models/User')
const {verifyToken, verifyTokenAuth, verifyTokenAdmin} = require('./verifyToken')

//checked true OK

//Get One User 
router.get("/find/:id", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//Get all User 
router.get("/", verifyTokenAdmin, async (req, res) => {
    const query = req.query.new
    try {
        const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//Get stats Users 
router.get("/stats", verifyTokenAdmin, async (req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1))
    try {
        const data = await User.aggregate([
            {   $match: {createdAt:{$gte: lastYear}}},
            {
                $project:{
                    month: {$month: "$createdAt"},
                },
            },
            {
                $group:{
                    _id:"$month",
                    total: { $sum: 1 },
                },
            }
        ])
        const sortedReturn = data.sort((a, b) => {    
            return a._id - b._id
        });
        res.status(200).json(sortedReturn)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//update User 
router.put("/:id", verifyTokenAuth, async (req, res) => {
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
    }
    await User.findByIdAndUpdate(req.params.id, { $set: req.body }, {new:true}).then((UpdateUser) => {
        res.status(200).json(UpdateUser)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//delete User 
router.delete("/:id", verifyTokenAuth, async (req, res) => { 
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
