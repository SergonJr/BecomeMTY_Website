const express= require('express');
const router = express.Router();

//Getting models
const Product = require('../models/Product');
const {isAuthenticated} = require('../helpers/auth');

//If user is authenticated it will continue, else it will redirect to login
router.get('/store/add', isAuthenticated, (req, res) => {
    res.render('store/new-product');
});

router.post('/store/new-product', isAuthenticated, async (req, res) => {
    const {title, description} = req.body;
    const errors = [];

    if (!title)
    {
        errors.push({text: 'Please Write a title'});
    }
    if (!description)
    {
        errors.push({text: 'Please provide a description'});
    }

    if (errors.length > 0)
    {
        res.render('store/new-product', {
            errors,
            title,
            description
        });
    }
    else
    {
        const newProduct = new Product({title, description});
        newProduct.user = req.user.id;
        await newProduct.save();
        req.flash('success_msg', 'Product Added Successfully');
        res.redirect('/store/products');
    }
});

router.get('/store/products', isAuthenticated, async (req, res) => {
    const products = await Product.find({user: req.user.id}).sort({date: 'desc'});
    res.render('store/all-products', {products});
});

router.get('/store/edit/:id', isAuthenticated, async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('store/edit-product', {product});
});

router.put('/store/edit-product/:id', isAuthenticated, async (req, res) => {
    const {title, description} = req.body;
    await Product.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Product Updated Successfully');
    res.redirect('/store/products');
});

router.delete('/store/delete-product/:id', isAuthenticated, async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/store/products');
});

module.exports = router;