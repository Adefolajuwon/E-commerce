const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true, // Removes leading/trailing whitespace
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
	category: {
		type: String,
		required: true,
	},
	stockQuantity: {
		type: Number,
		required: true,
		min: 0,
	},
	user: {
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
