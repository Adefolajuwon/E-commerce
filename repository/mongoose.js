require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connection.once('open', () => {
	console.log('Mongoose connection started....');
});

mongoose.connection.on('error', (e) => {
	console.log('Mongoose connection failed......' + e);
});
async function startMongoose() {
	await mongoose.connect(
		'mongodb+srv://juwon:tremothegoat@cluster0.lary7db.mongodb.net/E-commerce'
	);
}

module.exports = { startMongoose, mongoose };
