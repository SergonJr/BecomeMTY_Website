
const mongoose = require('mongoose');
const {Schema} = mongoose;

const CNotebook = new Schema({
    description: {type: String},
    price: {type: String},
    date: {type: Date, default: Date.now},
    nPages: {type: Number, default: 100},
    typeOfThread: {type: String, default: "Red"}
});

module.exports = mongoose.model('CNotebook', CNotebook);

