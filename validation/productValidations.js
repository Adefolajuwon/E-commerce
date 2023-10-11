const { body, validationResult } = require('express-validator');

const productValidation = [
	body('name').isLength({ min: 2 }),
	body('description').isLength({ min: 3 }),
	body('price').isNumeric().withMessage('Price must be a number'),
	body('stockQuantity')
		.isNumeric()
		.withMessage('Stock quantity must be a number'),
];

module.exports = { productValidation };
