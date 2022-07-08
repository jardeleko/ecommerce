const dotenv = require('dotenv').config()
const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_KEY)

router.post("/payment", (req, res) => {
    stripe.charges.create(

        {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "brl",

    }).then((stripeRes) => {
        res.status(200).json(stripeRes)

    }).catch((stripeError) => {
        console.log(stripeError)
        res.status(500).json(stripeError)
    
    })

})

module.exports = router
