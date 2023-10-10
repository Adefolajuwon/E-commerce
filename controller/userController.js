const { storeGoogleUser } = require('../models/userModels');
const {
	AuthenticationException,
} = require('../exceptions/authenticationException');
require('dotenv').config();
const jwt = require('jsonwebtoken');
async function controllerAuthGoogle(req, res, next) {
	try {
		if (!req.isAuthenticated()) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		req.session.profile = req.user;

		const user = await storeGoogleUser(req.user);
		const userId = req.user._id;

		if (user?.error) {
			return res.redirect(`/login?success=false&message=Authentication failed`);
		}

		const token = jwt.sign(
			{ _id: userId, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '7d' }
		);
		return res.redirect(`http://localhost:8000/setauthtoken/${token}`);
	} catch (error) {
		console.error('Error in controllerAuthGoogle:', error);
		// Handle errors with a JSON response
		return res.status(501).json({ error: 'Internal server error' });
	}
	// Ensure that `next()` is called only once, and in the right place
	next();
}

module.exports = { controllerAuthGoogle };
