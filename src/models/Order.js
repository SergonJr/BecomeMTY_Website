const mongoose = require('mongoose');
const {Schema} = mongoose;

/*
    ID
    PAGADO 
    STATUS = ENTREGADO, EN CAMINO
    DATE CREATED
    DATE PAYED
    CALIFICACION DE PRODUCTO = RESESEÑA, VALORACION
    DIRECCION = CP, CALLE, ETC.
    PRICE
*/

/*
    ORDER CAN BE EDITED BEFORE IT IS PAYED PRODUCTS CAN BE ADDED, DELETED OR MODIFIED
    PRODUCT WILL BE SUBSTRACTED FROM STOCK WHEN THE ORDER IS PAYED
    ALL ORDERS PAYED OR NOT CAN BE SEEN BY ADMIN
    ADMIN CAN DELETE ORDER BEFORE AND AFTER IT IS PAYED
    USER CAN DELETE ORDER BEFORE IT IS PAYED
*/

const OrderSchema = new Schema({
    status: {type: String, default: "NOT PAYED"},
    cCard: {type: String},
    date: {type: Date, default: Date.now},
    idCart: {type: String},
    total:{type: String}
});

module.exports = mongoose.model('Order', OrderSchema);