const router = require('express').Router()
const Cart = require('../models/Cart')
const {verifyToken, verifyTokenAuth, verifyTokenAdmin} = require('./verifyToken')

//CHECKED TRUE

//LIST ALL CARTS TO THE IDUSER OK
router.get("/find/:userId", verifyTokenAuth, async (req, res) => {
    try {
        const cart = await Cart.find({userId: req.params.userId})
        res.status(200).json(cart)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

// //GET ALL OK
router.get("/", verifyTokenAdmin, async (req, res) => {
    try {
        const carts = await Cart.find() 
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error)
    }
})

//CREATE OK
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE CART OK
router.put("/:id", verifyTokenAuth, async (req, res) => { //or verifyTokenAuth temporary
    try {
        const updateCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body, 
        }, {new:true})
        res.status(200).json(updateCart)
    }catch(err){
        res.status(500).json(err)
    }
})

//delete CART Ok
router.delete("/:id", verifyToken, async (req, res) => { //verifyTokenAuth temporary
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted!")
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
