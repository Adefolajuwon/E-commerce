async function createProduct(req, res) {
	try {
		const { name, description, price, category, stockQuantity } = req.body;
		const response = await saveProduct({
			name,
			description,
			price,
			category,
			stockQuantity,
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
	} catch (error) {}
	const { productId } = req.params;
	const response = await deleteProduct(productId);
	res
		.status(200)
		.json({ message: 'Product deleted successfully', product: response });
}
module.exports = { createProduct };
