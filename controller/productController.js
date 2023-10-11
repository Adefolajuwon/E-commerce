const {
	storeProduct,
	removeProductById,
	getProductById,
	updateProductById,
} = require('../models/productModel');
const { body, validationResult } = require('express-validator');

const { User } = require('../schemas/userSchema');
async function createProduct(req, res) {
	try {
		// Check for validation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, description, price, stockQuantity } = req.body;
		const userId = req.user._id;

		const response = await storeProduct({
			name,
			description,
			price,
			stockQuantity,
			user: userId,
		});

		res
			.status(201)
			.json({ message: 'Product created successfully', product: response });
	} catch (error) {
		console.error('Error creating product:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

async function deleteProduct(req, res) {
	try {
		const { productId } = req.params;
		const response = await removeProductById(productId);
		res
			.status(200)
			.json({ message: 'Product deleted successfully', product: response });
	} catch (error) {
		res.status(501).json({ error: 'Internal server error' });
	}
}
async function getProduct(req, res) {
	try {
		const { productId } = req.params;
		const response = await getProductById(productId);
		if (!response) {
			return res.status(404).json({ error: 'product not found' });
		}
		return res.status(200).json({ product: response });
	} catch (error) {
		console.log(error);
		res.status(501).json({ error: 'Internal server error' });
		if (error.message === 'Product not found') {
			return res.status(404).json({ error: 'Product not found' });
		}

		res.status(500).json({ error: 'Internal server error' });
	}
}
async function updateProduct(req, res) {
	try {
		const { productId } = req.params;
		const { name, description, price, category, stockQuantity } = req.body;

		const data = {
			name: name,
			description: description,
			price: price,
			category: category,
			stockQuantity: stockQuantity,
		};

		const updatedProduct = await updateProductById(productId, data);

		if (!updatedProduct) {
			return res.status(404).json({ error: 'Product not found' });
		}

		return res.status(200).json(updatedProduct);
	} catch (error) {
		console.error('Error updating product:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

async function getUserProducts(req, res) {}
module.exports = { createProduct, deleteProduct, getProduct, updateProduct };
