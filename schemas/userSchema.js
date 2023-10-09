const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	cart: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Cart',
		},
	],
});

module.exports = mongoose.model('User', userSchema);
