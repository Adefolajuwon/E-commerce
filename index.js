const express = require('express');
const app = express();
const cors = require('cors');

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

module.exports = app;
