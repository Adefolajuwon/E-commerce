const { addProductToCart } = require('../models/cartModel');
const Cart = require('../schemas/cartSchema');
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
//GETS PRODUCTS IN THE CART
async function getCarts(req, res) {
	try {
		const cart = await Cart.find({
			userId: req.user.id,
		}).select(items);
		if (!cart) {
			res.status(404).json(cart);
		}
	} catch (error) {}
}
