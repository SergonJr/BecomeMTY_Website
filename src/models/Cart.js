//CART

const mongoose = require('mongoose');
const {Schema} = mongoose;


/*
    ID
    ARRAY OF PRODUCTS = PRODUCT, CANTIDAD
    ARRAY OF CUSTOM PRODUCTS = CUSTOMPRODUCT, CANTIDAD
    PRICE OF PRODUCTS WITHOUT IVA AND WITHOUT SHIPPING
    PRICE OF PRODUCTS WITH IVA AND WITHOUT SHIPPING
    TOTAL PRICE
*/

const CartSchema = new Schema({
    idProduct: {type: String},
    date: {type: Date, default: Date.now},
    quantity: {type: Number, default: '1'},
    custom: {type: Boolean, default: true},
    idUser: {type: String}
});

module.exports = mongoose.model('Cart', CartSchema);

