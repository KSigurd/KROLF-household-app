import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrRNPhtKRPnlJTFtdO8RTquCg4q1YDQXM",
  authDomain: "hushallet-36ac4.firebaseapp.com",
  projectId: "hushallet-36ac4",
  storageBucket: "hushallet-36ac4.appspot.com",
  messagingSenderId: "495770654076",
  appId: "1:495770654076:web:887db897b79f3dd8c6c0f9"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };