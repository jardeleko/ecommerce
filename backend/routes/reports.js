const router = require('express').Router()
const Report = require('../models/Reports')
const {verifyToken, verifyTokenAuth, verifyTokenAdmin} = require('./verifyToken')

//checked true

//GET all reports
router.get("/find", async (req, res) => {
    await Report.find().then((report) => {
        res.status(200).json(report)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//GET one
router.get("/find/:id", async (req, res) => {
    try {
        const report = await Report.findById(req.params.id)
        res.status(200).json(report)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//POST report 
router.post("/", async (req, res) => {
    const newReport = new Report(req.body)
    try {
        const savedProduct = await newReport.save();
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const report = await Report.findByIdAndDelete(req.params.id)
        res.status(200).json(report)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router
