const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    imgUrl: {type: String},
    title: {type: String, required: Boolean},
    description: {type: String, required: Boolean},
    price: {type: Number,required: Boolean},
    category: {type: String},
    rating: {type: Number},
    userId:{type:String},
    allRatings: {type: Array}

});

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;