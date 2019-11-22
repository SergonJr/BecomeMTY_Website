const express = require('express');
const router = express.Router();

//Getting models
const Product = require('../models/Product');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const CNotebook = require('../models/CNotebook');

const {isAuthenticated} = require('../helpers/auth');

//If user is authenticated it will continue, else it will redirect to login
router.get('/store/add', isAuthenticated, (req, res) => {
    res.render('store/new-product');
});

router.get('/store/stock', async (req, res) => {
    const products = await Product.find({inStock: {$gt: 0}}).sort({date: 'desc'});
    res.render('store/all-products', {products});
});

router.get('/store/new-custom-product', isAuthenticated, (req, res) => {
    res.render('store/new-custom-product');
});

router.post('/store/add-cn-to-cart/', isAuthenticated, async (req, res) => {
    const {nPages, typeOfThread, description, price} = req.body;

    const newCN = new CNotebook({description, price, nPages, typeOfThread});
    await newCN.save();
    const idProduct = newCN._id;

    const newCCN = new Cart({idProduct, custom: true, idUser: req.user.id});
    await newCCN.save();

    req.flash('success_msg', 'Product Added Successfully To Cart');
    res.redirect('/');
});

router.get('/cart', async (req, res) => {

    const products = await Cart.find(idProduct);
    res.render('store/stock', {products});
});

router.post('/store/new-product', isAuthenticated, async (req, res) => {
    const {title, description, price, inStock, typeOfProduct} = req.body;
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
            description,
            price, 
            inStock,
            typeOfProduct
        });
    }
    else
    {
        const newProduct = new Product({title, description, price, inStock, typeOfProduct});
        await newProduct.save();
        req.flash('success_msg', 'Product Added Successfully');
        res.redirect('/store/products');
    }
});

router.get('/store/products', isAuthenticated, async (req, res) => {
    var products;

    if (req.user.admin)
    {
        products = await Product.find().sort({date: 'desc'});
    }        

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