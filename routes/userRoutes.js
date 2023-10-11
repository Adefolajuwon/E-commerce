require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { controllerAuthGoogle } = require('../controller/userController');
const { passport } = require('../lib/passport');

const authRouter = express.Router();
authRouter.use(
	session({
		secret: process.env.SESSION_TOKEN,
		resave: false,
		saveUninitialized: false,
	})
);

authRouter.use(passport.initialize());
authRouter.use(passport.session());

authRouter.get('/google', passport.authenticate('google', { scope: 'email' }));
authRouter.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: '/register' }),
	controllerAuthGoogle
);
module.exports = authRouter;
