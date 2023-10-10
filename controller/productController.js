const {
	storeProduct,
	removeProductById,
	getProductById,
} = require('../models/productModel');
const { User } = require('../schemas/userSchema');

async function createProduct(req, res) {
	try {
		// const theUser = User.findById(req.user.id);
		const { name, description, price, category, stockQuantity } = req.body;
		const userId = req.user._id;
		const response = await storeProduct({
			name,
			description,
			price,
			category,
			stockQuantity,
			user: userId,
		});

		res
			.status(201)
			.json({ message: 'Product created successfully', product: response });
		console.log(req.user.id);
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
async function getUserProducts(req, res) {}
module.exports = { createProduct, deleteProduct, getProduct };
