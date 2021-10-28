// const firebase = require("firebase");
// require("firebase/firestore");
// const initializeApp = require("firebase/app");
// const firebaseConfig = require("../fireStore");
// const app = require("../fireStore")
// const {db} = require("../fireStore");
const { Request, Response, NextFunction } = require('express');


const initializeApp = require("firebase/app");
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBrRNPhtKRPnlJTFtdO8RTquCg4q1YDQXM",
//   authDomain: "hushallet-36ac4.firebaseapp.com",
//   projectId: "hushallet-36ac4",
//   storageBucket: "hushallet-36ac4.appspot.com",
//   messagingSenderId: "495770654076",
//   appId: "1:495770654076:web:887db897b79f3dd8c6c0f9"
// };

firebase.initializeApp({
  apiKey: "AIzaSyBrRNPhtKRPnlJTFtdO8RTquCg4q1YDQXM",
  authDomain: "hushallet-36ac4.firebaseapp.com",
  projectId: "hushallet-36ac4",
});

var db = firebase.firestore();



/**
 * Returns one product
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
async function getUser(req, res, next) {
    var a = res.json(db.collection("users").get())
    // var a = db.collection("users").get();
    console.log(a);
}


/**
 * Adds one product
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
async function postUser(req, res, next) {
    
    // const user = {
    //     ...req.body, id: 1
    // };
    // db.collection("users").add(user);
    
    db.collection("users").add({    
        email: "ooueueo",
        id: 0 ,
        password: "eueuue",
    })

    
    // db.collection("users").add({
    //     id: 0123,
    //     email: "olivia.annemaria@hotmail.com",
    //     password: "lösenordet"
    // })
    // .then((docRef) => {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch((error) => {
    //     console.error("Error adding document: ", error);
    // });
    
}


// if (await readProducts() == true) {
//     const newProduct = {
//         id: uuidv1(),
//         ...req.body
//     }

//     //Ensures product price is a two-point decimal value
//     newProduct.price = parseFloat(newProduct.price).toFixed(2);

//     products.push(newProduct);
//     await writeProductsToFile(products);
//     res.status(201).json(newProduct);
// } else {
//     res.status(500).send();
// }


//exports methods to the router
module.exports = {
    getUser,
    postUser
};