const router = require('express').Router()
const Like = require('../models/Likes')
const {verifyToken, verifyTokenAuth, verifyTokenAdmin} = require('./verifyToken')

//checked true

//GET all true
router.get("/find", verifyToken, async (req, res) => {
    await Like.find().then((likes) => {
        res.status(200).json(likes)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//GET all  by client true
router.get("/find/:idUser", verifyTokenAuth, async (req, res) => {
    const id = req.params.idUser
    await Like.find({userId:id}).then((likes) => {
        res.status(200).json(likes)
    }).catch((err) => {
        res.status(200).json(err)
    })

})
router.get("/find/total/:userId", verifyTokenAuth, async (req, res) => {
    await Like.find({userId: req.params.userId}).then((likes) => {
        var count = likes.length
        console.log(count)
        res.status(200).json(count)
    }).catch((error) => {
        console.log(error)
        res.status(500).json(error)
    }) 
})

//POST Like true
router.post("/", verifyToken, async (req, res) => {
    const newLike = new Like(req.body)
    try {
        const savedLike = await newLike.save();
        res.status(200).json(savedLike)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete Like true
router.delete("/:id", verifyToken, async (req, res) => {
    const id = req.params.id
    try {
        const like = await Like.findByIdAndDelete(req.params.id)
        res.status(200).json(like)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router
