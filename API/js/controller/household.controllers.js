const { Request, Response, NextFunction } = require('express');
const { readProductsFromFile, writeProductsToFile } = require('./jsonFileHandler');
const { v1: uuidv1 } = require('uuid');

//Temporary array for products
let products = [];

/**
 * Returns all products
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
async function getProducts(req, res, next) {
    if (await readProducts() == true) {
        res.status(200).json(products);
    } else {
        res.status(500).send();
    }
}

/**
 * Returns one product
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
async function getProduct(req, res, next) {
    if (await readProducts() == true) {
        const { id } = req.params;
        const product = products.find(product => product.id == id);
        if (!product) {
            res.status(404).json('Product not found');
        } else {
            res.status(200).json(product);
        }
    } else {
        res.status(500).send();
    }
}

/**
 * Adds one product
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
async function addProduct(req, res, next) {
    if (await readProducts() == true) {
        const newProduct = {
            id: uuidv1(),
            ...req.body
        }

        //Ensures product price is a two-point decimal value
        newProduct.price = parseFloat(newProduct.price).toFixed(2);

        products.push(newProduct);
        await writeProductsToFile(products);
        res.status(201).json(newProduct);
    } else {
        res.status(500).send();
    }
    
}

/**
 * Updates one product
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
async function updateProduct(req, res, next) {
    if (await readProducts() == true) {
        const { id } = req.params;
        const productToUpdate = {
            id: id,
            ...req.body
        }

        //Ensures product price is a two-point decimal value
        productToUpdate.price = parseFloat(productToUpdate.price).toFixed(2);

        const indexToUpdate = products.findIndex(product => product.id == id);
        if (indexToUpdate >= 0) {
            products[indexToUpdate] = productToUpdate;
            await writeProductsToFile(products);
            res.status(200).json(productToUpdate);
        } else {
            res.status(404).json('Product not found');
        }
    } else {
        res.status(500).send();
    }
}

/**
 * Deletes one product
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next
 */
async function deleteProduct(req, res, next) {
    if (await readProducts() == true) {
        const { id } = req.params;
        const indexToRemove = products.findIndex(product => product.id == id);
        if (indexToRemove >= 0) {
            products.splice(indexToRemove, 1);
            await writeProductsToFile(products);
            res.status(204).send();
        } else {
            res.status(404).json('Product not found');
        }
    } else {
        res.status(500).send();
    }
}

//Calls function for getting products from json and returns a bool depending on if empty or not
async function readProducts () {
    products = await readProductsFromFile();
    if (!products) return false;
    else return true;
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}