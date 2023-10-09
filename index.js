const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');

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
// app.use('/setauthtoken', (req, res) => {
// 	res.send('welcome');
// });
app.use('/api/auth', authRouter);
app.use('/api', productRouter);

module.exports = app;
