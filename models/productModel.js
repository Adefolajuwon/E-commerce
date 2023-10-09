const Product = require('../schemas/productSchema');

async function saveProduct(product) {
	try {
		const response = await Product.create(product);
		if (!response) {
			throw new Error('Failed to create the product.');
		}
		return response;
	} catch (error) {
		console.error('Error while saving the product:', error.message);
		throw error;
	}
}
async function deleteProduct(id) {
	try {
		const response = await Product.findByIdAndDelete(id);
		if (!response) {
			throw new Error('Fialed to delete the product');
		}
		return response;
	} catch (error) {
		console.error('Error while deleting the product:', error.message);
		throw error;
	}
}
module.export = { saveProduct, deleteProduct };
