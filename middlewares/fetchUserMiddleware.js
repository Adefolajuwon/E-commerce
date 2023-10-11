require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const fetchUser = async (req, res, next) => {
	let auth = req.headers.authorization;
	if (!auth || !auth.startsWith('Bearer ')) {
		return res.status(401).json({ error: 'User not authenticated' });
	}

	const token = auth.split(' ')[1];
	try {
		const payload = jwt.verify(token, JWT_SECRET);
		// Assuming your user data is stored in `payload.user`
		req.user = payload.user;
		console.log(req.user); // This should now log the user data
		next();
	} catch (error) {
		console.error(error);
		return res.status(401).json({ error: 'Invalid token' });
	}
};

module.exports = { fetchUser };
