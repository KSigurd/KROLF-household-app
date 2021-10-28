
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


exports.name = db;




