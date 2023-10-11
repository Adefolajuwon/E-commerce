const {
	storeProduct,
	removeProductById,
	getProductById,
	updateProductById,
	getAllProducts,
} = require('../models/productModel');
const { sendSuccess, sendError } = require('./baseController');
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
		// const userId = req.user.id;

		const response = await storeProduct({
			name,
			description,
			price,
			stockQuantity,
			user: req.user.id,
		});

		res
			.status(201)
			.json({ message: 'Product created successfully', product: response });
	} catch (error) {
		sendError(res, 'Error occured while trying to create product', 500);
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
		sendError(res, 'Error occured while trying to delete product', 500);

		// res.status(501).json({ error: 'Internal server error' });
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
		if (error.message === 'Product not found') {
			return res.status(404).json({ error: 'Product not found' });
		}
		sendError(res, 'Error occured while trying to get product', 500);
	}
}
async function getProducts(req, res) {
	const { page, limit, sort } = req.query;
	const parsedLimit = parseInt(limit);
	const parsedPage = parseInt(page);
	const startIndex = (parsedPage - 1) * parsedLimit;
	const endIndex = parsedLimit * parsedPage;

	try {
		const productsQuery = getAllProducts()
			.skip(startIndex)
			.limit(parsedLimit)
			.sort(sort);

		const products = await productsQuery.exec();

		const response = {
			pagination: {
				currentPage: parsedPage,
				perPage: parsedLimit,
				totalPages: Math.ceil(totalDocuments / parsedLimit),
				totalDocuments: totalDocuments,
			},
			products: products,
		};
		res.status(200).json(response);
	} catch (error) {
		sendError(res, 'Error occured while trying to get product', 500);
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
		sendError(res, 'Error occured while trying to update product', 500);
	}
}

async function getUserProducts(req, res) {
	try {
		const product = await getUserProductByUserId(req.user);
		if (!product) res.status(404).json({ message: 'No products found' });
		return res.status(200).json(product);
	} catch (error) {
		console.error('Error updating product:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

module.exports = {
	createProduct,
	deleteProduct,
	getProduct,
	updateProduct,
	getProducts,
};
