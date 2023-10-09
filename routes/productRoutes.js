const express = require('express');
const {
	createProduct,
	deleteProduct,
	getProduct,
} = require('../models/productModel');
const productRouter = express.Router();
productRouter.post('/product', createProduct);
productRouter.get('/product', getProduct);
productRouter.delete('/product', deleteProduct);
module.exports = { productRouter };
