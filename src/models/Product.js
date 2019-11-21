const mongoose = require('mongoose');
const {Schema} = mongoose;

//ADD A VAR TO HID PRODUCT FROM CLIENTS

/*
    ID
    PRODUCT NAME
    PRICE
    DESC
    IMAGE
    IN STOCK: #
    //ADMIN MUST BE ABLE TO ADD MORE TYPES OF PRODUCT
    TYPE OF PRODUCT: LAPICES, LIBRETAS DE MADERA, LIBRETAS DE CARTON = LIBRETA DE CARTON, SEPARADORES 
    DATE ADDED
*/


const ProductSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Product', ProductSchema);