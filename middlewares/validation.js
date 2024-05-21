const { validationResult, check } = require('express-validator');

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

exports.userValidationRules = () => [
    check('username').not().isEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Email is invalid'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

exports.productValidationRules = () => [
    check('name').not().isEmpty().withMessage('Product name is required'),
    check('description').not().isEmpty().withMessage('Product description is required'),
    check('price').isFloat({ gt: 0 }).withMessage('Product price must be greater than 0'),
    check('category').not().isEmpty().withMessage('Product category is required'),
    check('stock').isInt({ gt: 0 }).withMessage('Product stock must be greater than 0')
];
