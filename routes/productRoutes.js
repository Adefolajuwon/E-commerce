const express = require('express');
const fetchUser = require('../middlewares/fetchUserMiddleware');
const {
	createProduct,
	deleteProduct,
	getProduct,
} = require('../models/productModel');
const productRouter = express.Router();
productRouter.use(fetchUser);
productRouter.post('/product', createProduct);
productRouter.get('/product', getProduct);
productRouter.delete('/product', deleteProduct);
module.exports = { productRouter };
