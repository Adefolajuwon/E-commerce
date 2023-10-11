const { addProductToCart } = require('../models/cartModel');
const { sendSuccess, sendError } = require('./baseController');

const Cart = require('../schemas/cartSchema');
async function addToCart(req, res) {
	try {
		const { productId } = req.params;
		const userId = req.user.user.id;
		const product = await addProductToCart(userId, productId);
		if (!product) {
			res.status(501).json({ error: 'unable to add product to cart' });
		}
	} catch (error) {
		sendError(res, 'Error occured while trying to add product to cart', 500);
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
module.exports = { addToCart };
