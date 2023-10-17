const {
	storeProduct,
	removeProductById,
	getProductById,
	updateProductById,
	getAllProducts,
	getUserProductByUserId,
} = require('../models/productModel');
const { sendSuccess, sendError } = require('./baseController');
const { body, validationResult } = require('express-validator');

const { User } = require('../schemas/userSchema');
const Product = require('../schemas/productSchema');
//CREATE A  NEW PRODUCT
async function createProduct(req, res) {
	try {
		// Check for validation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, description, price, stockQuantity } = req.body;
		const response = await storeProduct({
			name,
			description,
			price,
			stockQuantity,
			user: req.user.id,
		});
		sendSuccess(res, 'Product created successfully', response);
	} catch (error) {
		sendError(res, 'Error occured while trying to create product', 501);
	}
}
//DELETE A PRODUCT
async function deleteProduct(req, res) {
	try {
		const { productId } = req.params;
		const response = await removeProductById(productId);
		sendSuccess(res, 'Product deleted successfully', response);
	} catch (error) {
		sendError(res, 'Error occured while trying to delete product', 500);
	}
}
//GET A PRODUCT BY ID
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
		if (error.message === 'Product not found') {
			return res.status(404).json({ error: 'Product not found' });
		}
		sendError(res, 'Error occured while trying to get product', 500);
	}
}
//GET ALL PRODUCTS
async function getProducts(req, res) {
	try {
		const products = await Product.find({});

		const response = products;
		if (!response) {
			sendError(res, 'There are products available right now', 404);
		}

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		sendError(res, 'Error occured while trying to get product', 500);
	}
}
//UPDATE A PRODUCT
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
		sendError(res, 'Error occured while trying to update product', 500);
	}
}
//GET A USER PRODUCTS
async function getUserProducts(req, res) {
	try {
		const userId = req.user.id;
		const products = await getUserProductByUserId(userId);

		if (products.length === 0) {
			sendError(res, 'No products available', 404);
		}
		sendSuccess(res, 'Success', products);
	} catch (error) {
		sendError(res, 'Error occured while trying to get products');
	}
}

module.exports = {
	createProduct,
	deleteProduct,
	getProduct,
	updateProduct,
	getProducts,
	getUserProducts,
};
