const express = require('express');
const { fetchUser } = require('../middlewares/fetchUserMiddleware');
const {
	createProduct,
	deleteProduct,
	updateProduct,
	getProduct,
} = require('../controller/productController');
const { productValidation } = require('../validation/productValidations');
let productRouter = express.Router();
productRouter.use(fetchUser);

productRouter.post('/product', productValidation, createProduct);
productRouter.get('/all-product');
productRouter.get('/product/:productId', getProduct);
productRouter.delete('/product/:productId', deleteProduct);
productRouter.patch('/product/:productId', productValidation, updateProduct);

module.exports = productRouter;
