const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userID: { type: String, required: Boolean },
    order: { type: Array, required: Boolean }

});

const OrderModel = mongoose.model('order', orderSchema);

module.exports = OrderModel;
