// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUP6WX8UwE7K8taWpj7roq0uYFBQUrdXc",
  authDomain: "ecommercefirebase-a4781.firebaseapp.com",
  projectId: "ecommercefirebase-a4781",
  storageBucket: "ecommercefirebase-a4781.firebasestorage.app",
  messagingSenderId: "182405808636",
  appId: "1:182405808636:web:f393525b160a7ec80c3279",
  measurementId: "G-QFSZC06G4M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);