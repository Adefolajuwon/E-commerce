const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	stockQuantity: {
		type: Number,
		required: true,
		min: 0,
	},
	user: {
		type: String,
		// required: true,
	},
	email: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// Create a Product model based on the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
