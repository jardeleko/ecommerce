const router = require('express').Router()
const Order = require('../models/Order')
const User = require('../models/User')

const {verifyToken, verifyTokenAuth, verifyTokenAdmin} = require('./verifyToken')

//CHECKED TRUE

//GET USER ORDERS OK
router.get("/find/:userId", verifyTokenAuth, async (req, res) => {
    await Order.find({userId: req.params.userId}).then((orders) => {
        res.status(200).json(orders)
    }).catch((error) => {
        console.log(error)
        res.status(500).json(error)
    }) 
})

// GET ALL OK
router.get("/", verifyTokenAdmin, async (req, res) => {
    await Order.find().then((orders) => {
        res.status(200).json(orders)
    }).catch ((error)=> {
        res.status(500).json(error)
    }) 
})

//GET MONTHLY INCOME OK
router.get("/income", verifyTokenAdmin, async (req, res) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-3))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() -3))
    await Order.aggregate([
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
    ]).then((income) => {
        res.status(200).json(income)     
    }).catch((error) => {
        res.status(500).json(error)
    }) 
})

router.get("/income/sales", verifyTokenAdmin, async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 2));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 2));
    
    try {
      const income = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: previousMonth },
            ...(productId && {
              products: { $elemMatch: { productId: productId } },
            }),
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//CREATE ORDER OK
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)
    if(req.body.products !== []){
        await newOrder.save().then((savedOrder) => {
            res.status(200).json(savedOrder)
        }).catch((err) => {
            res.status(500).json(err) 
        })
    }
    else {
        console.log('invalid transaction!')
    }
})

//UPDATE ORDER OK
router.put("/:id", verifyTokenAdmin, async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id, {
        $set: req.body, 
    }, {new:true}).then((updateOrder) => {
        res.status(200).json(updateOrder) 
    }).catch((err)=> {
        res.status(500).json(err)
    })
})

//delete ORDER OK
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
    await Order.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json("Deleted order!")
    }).catch((error) => {
        res.status(500).json(error)
    })
})

module.exports = router
