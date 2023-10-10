const Product = require('../schemas/productSchema');
const { User } = require('../schemas/userSchema');
const mongoose = require('mongoose');
async function storeProduct(product) {
	try {
		const response = await Product.create(product);
		if (!response) {
			throw new Error('Failed to create the product.');
		}
		return response;
	} catch (error) {
		console.error('Error while saving the product:', error.message);
		throw error;
	}
}
async function removeProductById(id) {
	try {
		const response = await Product.findByIdAndDelete(id);
		if (!response) {
			throw new Error('Fialed to delete the product');
		}
		return response;
	} catch (error) {
		console.error('Error while deleting the product:', error.message);
		throw error;
	}
}
async function getProductById(id) {
	try {
		const objectId = new mongoose.Types.ObjectId(id);

		const response = await Product.findById(objectId);

		if (!response) {
			throw new Error('Product not found');
		}

		return response;
	} catch (error) {
		console.error('Error fetching product:', error);
		throw error;
	}
}

async function getAllUserProducts(id) {
	try {
		const response = await Product.where().equals();
	} catch (error) {}
}
module.exports = { storeProduct, removeProductById, getProductById };
