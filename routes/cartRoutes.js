const express = require('express');
const { addToCart, getCart } = require('../controller/cartController');
const { fetchUser } = require('../middlewares/fetchUserMiddleware');

let cartRouter = express.Router();
cartRouter.use(fetchUser);
cartRouter.post('/cart/:productId', addToCart);
cartRouter.get('/cart', getCart);
module.exports = cartRouter;
