const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: {type: String, required: Boolean},
    name_lower: {type: String, required: Boolean},
});

const categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;