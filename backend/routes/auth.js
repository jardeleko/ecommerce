const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

// OK

router.post("/register", async (req, res) => {
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
    })
    try{
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
        console.log(savedUser)
    }catch(err){
        res.status(500).json(err)
        console.log("Problem on saved" + err)
    }
})

router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({username:req.body.username})
        !user && res.status(401).json("Wrong credentials! no User in DB") //verifica se existe usuário
        const hashPassw = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET)
        const passw = hashPassw.toString(CryptoJS.enc.Utf8)
        passw !== req.body.password && res.status(401).json("Wrong credentials! passwd") //se existe usuário e se a senha esta correta
        const accessTk = jwt.sign({
            id:user._id, 
            isAdmin: user.isAdmin,

        }, 
        process.env.JWT_SECRET,
        {expiresIn:"3d"}
        )
        const {password, ...others} = user._doc
        res.status(200).json({...others, accessTk})
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router
