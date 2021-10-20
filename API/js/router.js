const express = require('express');
// const {getProducts, getProduct, addProduct, updateProduct, deleteProduct} = require('./products.controllers');
const router = express.Router();
const { getUser, postUser } = require("./controller/user.controller");
//Imports data validation functions
const { decimalCheck, bodyValidation, paramValidation } = require('./products.validation');

/* USER */
router.get('/v1/user/:id', getUser);
router.post('/v1/user', postUser);

// /* HOUSEHOLD */

// router.get('/v1/houshold/:userId', getHousehold);
// router.post('/v1/houshold/', postHousehold);
// router.put('/v1/houshold/:id', putHoushold);

// /* HOUSEHOLDUSER */

// router.get('/v1/housholdUser/:id', getHouseholdUser);
// router.post('/v1/housholdUser/', postHouseholdUser);
// router.put('/v1/housholdUser/:id', putHousholdUser);

// /* CHORES */

// router.get('/v1/chore/:householdId', getChore);
// router.post('/v1/chore/', postChore);
// router.put('/v1/chore/:id', putChore);

// /* COMPLETEDCHORE */

// router.get('/v1/completedChore/:choreId', getCompletedChore);
// router.post('/v1/completedChore/', postCompletedChore);

// router.get('/v1/products/:id', paramValidation, getProduct);
// router.post('/v1/products', decimalCheck, bodyValidation, addProduct);
// router.put('/v1/products/:id', decimalCheck, paramValidation, bodyValidation, updateProduct);
// router.delete('/v1/products/:id', paramValidation, deleteProduct);

module.exports = router;