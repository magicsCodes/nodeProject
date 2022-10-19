var mongoose = require('mongoose');
const categoryModel = require('./categoryModel');
var Schema   = mongoose.Schema;

const productSchema = new Schema({
	'name' : String,
	//'categoryId' : Number,
	'categoryId':{
     type :mongoose.Schema.Types.ObjectId,
     ref:categoryModel
	},
	'description' : String,
	'price' : Number,
	'imageURL' : String
});

module.exports = mongoose.model('product', productSchema);
