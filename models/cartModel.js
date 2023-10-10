const Cart = require('../schemas/cartSchema');
const { getProductById } = require('./productModel');
async function addProductToCart(userId, productId) {
	try {
		const updatedCart = await Cart.findOneAndUpdate(
			{ userId: userId },
			{ $push: { items: productId } },
			{ upsert: true, new: true }
		);

		if (!updatedCart) {
			console.error('Cart not found or not updated.');
		} else {
			console.log('Product added to cart:', updatedCart);
			return updatedCart;
		}
	} catch (error) {
		console.error('Error adding product to cart:', error);
		throw error;
	}
}

module.exports = { addProductToCart };
