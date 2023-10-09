const {
	saveProduct,
	deleteProduct,
	getProduct,
} = require('../models/productModel');
const { User } = require('../schemas/userSchema');

async function createProduct(req, res) {
	try {
		// const theUser = User.findById(req.user.id);
		const { name, description, price, category, stockQuantity } = req.body;
		const response = await saveProduct({
			name,
			description,
			price,
			category,
			stockQuantity,
			user: req.user.id,
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
		const response = await deleteProduct(productId);
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
		const response = await getProduct(productId);
		res.status(200).json({ product: response });
	} catch (error) {
		res.status(501).json({ error: 'Internal server error' });
	}
}
module.exports = { createProduct, deleteProduct, getProduct };
