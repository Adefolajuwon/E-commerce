const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');

app.use((req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	next();
});

app.use(express.json());
app.use(
	cors({
		origin: '*',
	})
);

app.use('/api/auth', authRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);

module.exports = app;
