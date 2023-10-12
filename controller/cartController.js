const { addProductToCart } = require('../models/cartModel');
const { sendSuccess, sendError } = require('./baseController');
const { Product } = require('../schemas/cartSchema');
const mongoose = require('mongoose');

const Cart = require('../schemas/cartSchema');
async function addToCart(req, res) {
	try {
		const { productId } = req.params;
		const objectId = new mongoose.Types.ObjectId(productId);

		const userId = req.user.id;
		const product = await addProductToCart(userId, objectId);
		if (!product) {
			res.status(501).json({ error: 'unable to add product to cart' });
		}
		return sendSuccess(res, 'Added to cart', product);
	} catch (error) {
		console.log(error);
		sendError(res, 'Error occured while trying to add product to cart', 500);
	}
}
//GET A  USER CART
async function getCart(req, res) {
	try {
		// const{productId} = req.params
		// const objectId = new mongoose.Types.ObjectId(id);

		const cart = await Cart.find({
			user: req.user.id,
		});

		if (!cart) {
			res.status(404).json(cart);
		}
		return res.status(200).json(cart);
	} catch (error) {}
}
module.exports = { addToCart, getCart };
