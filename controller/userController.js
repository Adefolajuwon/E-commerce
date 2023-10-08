const { storeGoogleUser } = require('../models/userModels');
const {
	AuthenticationException,
} = require('../exceptions/authenticationException');
require('dotenv').config();
const jwt = require('jsonwebtoken');
async function controllerAuthGoogle(req, res, next) {
	try {
		if (!req.isAuthenticated()) {
			res.status(401).json({ error: 'Unauthorized' });
		}
		req.session.profile = req.user;
		const user = await storeGoogleUser(req.user);
		console.log(user);

		if (user?.error) {
			res.redirect(`/login?success=false&message=Authentication failed`);
			return;
		}
		let token = jwt.sign(
			{ _id: user._id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '7d' }
		);
		console.log(token);
		res.redirect(`http://localhost:8000/setauthtoken/${token}`);
	} catch (error) {
		console.log(error);
		res.status(501).json(error);
	}
	next();
}
module.exports = { controllerAuthGoogle };
