const router = require('express').Router()
const Product = require('../models/Product')
const {verifyToken, verifyTokenAuth, verifyTokenAdmin} = require('./verifyToken')

//checked true

//GET PRODUCT OK
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//GET ALL PRODUCTS OK
router.get("/", async (req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        let products
        if(qNew){
            products = await Product.find().sort({createdAt:-1}).limit(2)
        }else if(qCategory){
            products = await Product.find({categories:{$in:[qCategory],},}) 
        }else{
            products = await Product.find() 
        }
        res.status(200).json(products)
    } catch (error) {
        
        res.status(500).json(error)
    }
})

//ADD PRODUCT OK verifyTokenAdmin
router.post("/", async (req, res) => {
    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE PRODUCT OK verifyTokenAdmin
router.put("/:id", async (req, res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body, 
        }, {new:true})
        res.status(200).json(updateProduct)
    }catch(err){
        res.status(500).json(err)
    }
})

//DELETE PRODUCT OK befora verifyTkAdmin
router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
