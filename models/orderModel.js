var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const orderItemSchema = new Schema({
	'prod_id': {
		'type': Schema.Types.ObjectId,
		'ref': 'product'
	},
	quntity: Number
})

var orderSchema = new Schema({
	'userId': {
		'type': Schema.Types.ObjectId,
		'ref': 'User',
	},
	'date': Date,
	'sum': Number,
	'products': {
		'type': [orderItemSchema]
	}
});

module.exports = mongoose.model('order', orderSchema);
