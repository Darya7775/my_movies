import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbJMiaorWTC4kbP7HVKDZepQDIAN-nIWU",
  authDomain: "mymovies-1f13f.firebaseapp.com",
  projectId: "mymovies-1f13f",
  storageBucket: "mymovies-1f13f.appspot.com",
  messagingSenderId: "59763644890",
  appId: "1:59763644890:web:6b583d1a8f0d31e23f88e3",
  measurementId: "G-KKS5LGVJ1K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore
export const db = getFirestore(app);
