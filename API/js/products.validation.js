const { validationResult, body, param } = require('express-validator');
const { Request, Response, NextFunction } = require('express');

//Replaces , with . for a valid float value
function decimalCheck(req, res, next) {
    if (req.body) {
        if ((req.body.price).includes(',')) {
            req.body.price = (req.body.price).replace(',', '.');
        }
    }
    next();
}

//Ensures valid data in request body
bodyValidation = [
    body('productNumber')
    .notEmpty()
    .matches(/^[A-Z]{2}\d{4}$/)
    .withMessage('"productNumber must follow pattern "XX1111"'),

    body('name')
    .notEmpty()
    .withMessage('"name" cannot be empty'),

    body('price')
    .notEmpty()
    .isFloat()
    .withMessage('"price" must contain a numeric value'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
        } else {
            next();
        }
    }
]

//Ensures valid uuid as request parameter
paramValidation = [
    param('id')
    .isUUID()
    .withMessage('"id" must be a valid UUID'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
        } else {
            next();
        }
    }
]

module.exports = {
    decimalCheck,
    bodyValidation,
    paramValidation
}