class OutOfStockError extends Error {
	constructor(productName) {
		super(`Sorry, the product "${productName}" is currently out of stock.`);
		this.name = 'OutOfStockError';
	}
}
