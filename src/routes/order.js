const express= require('express');
const router = express.Router();

// Getting models
const Order = require('../models/Order');

router.get('/cart', (req, res) => {
    res.render('cart');
});

router.get('/orders', (req, res) => {
    res.render('cart');
});

router.get('/admin', (req, res) => {
    Order.find((err, docs) => {
        if (!err)
        {
            res.render('admin', {
                order: docs
            });
        }
        else
        {
            console.log("Error in order: " + err);
        }
    });
});

router.get('/order/:id', (req, res) => {
    Order.findById(req.params.id, (err, doc) => {
        if (!err)
        {
            res.render('orders', {order:doc});
        }
        else
        {
            console.log("Error findById: " + err);
        }
    });
});

router.get('/order/delete/:id', (req, res) => {
    Order.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err)
        {
            res.redirect('/admin');
        }
        else
        {
            console.log("Error in delete: " + err);
        }
    });
});

router.post('/cart', (req, res) => {
    updateOrder(req, res);
});

// Functions
function updateOrder(req, res) 
{
    Order.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if (!err)
        {
            res.redirect('/admin');
        }
        else
        {
            console.log("Error in function insertOrder" + err);
        }
    });
}

function insertOrder(req, res)
{
    var d = new Date();
    var t = d.getTime;
    var counter = t;
    counter += 1;

    var order = new Order();
    order.total = req.body.total;
    order.order = counter;
    order.save((err, doc) => {
        if (!err)
        {
            console.log('Order: ' + order);
            res.redirect('/admin');
        }
        else
        {
            console.log("Error in function insertOrder: " + err);
        }
    });
}

module.exports = router;