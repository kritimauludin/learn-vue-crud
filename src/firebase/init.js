// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHqawFpvXauMjEKLYSaaoRg5dWDMLisXY",
  authDomain: "learnvue-bf112.firebaseapp.com",
  projectId: "learnvue-bf112",
  storageBucket: "learnvue-bf112.appspot.com",
  messagingSenderId: "884725399281",
  appId: "1:884725399281:web:1a13feaa6ba0436cdf3350",
  measurementId: "G-SPF3KC09QT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db

