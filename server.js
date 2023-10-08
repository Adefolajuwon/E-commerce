const http = require('http');
const index = require('./index');

const { startMongoose } = require('./repository/mongoose');

const PORT = process.env.PORT || 8000;
const server = http.createServer(index);

(async function () {
	await startMongoose();
	server.listen(PORT, () => {
		console.log(`Server started on PORT ${PORT}...`);
	});
})();
