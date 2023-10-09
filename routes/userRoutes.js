require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { controllerAuthGoogle } = require('../controller/userController');
const { passportInstance } = require('../lib/passport');

const authRouter = express.Router();
authRouter.use(
	session({
		secret: process.env.SESSION_TOKEN,
		resave: false,
		saveUninitialized: false,
	})
);
authRouter.use(passportInstance.initialize());
authRouter.use(passportInstance.session());

authRouter.get(
	'/google',
	passportInstance.authenticate('google', { scope: ['email', 'profile'] })
);
authRouter.get(
	'/google/callback',
	passportInstance.authenticate('google', { failureRedirect: '/register' }),
	controllerAuthGoogle
);
module.exports = authRouter;
