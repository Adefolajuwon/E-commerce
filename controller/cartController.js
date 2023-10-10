const { addProductToCart } = require('../models/cartModel');
async function addToCart(req, res) {
	try {
		const { productId } = req.params;
		const userId = req.user.user.id;
		const product = await addProductToCart(userId, productId);
		if (!product) {
			res.status(501).json({ error: 'unable to create product' });
		}
	} catch (error) {
		res.status(501).json({ error: error });
	}
}
