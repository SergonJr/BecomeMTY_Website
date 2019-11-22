const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

/*
    NAME
    LASTNAME = FNAME, MNAME
    EMAIL
    PASSWORD
    DATE ADDED
    ESTADO*
    CIUDAD*
    CP*
    CALLE*
    COLONIA*
    TELEFONO CELULAR*
    TARJETA DE C/D
    CARRITO
    ORDENES DE COMPRA
    CLABE OF ADMIN
*/

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now},
    admin: {type: Boolean, default: false}
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);