// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo0f7b9pbYXOzJUECevZJtM4wxqEq1dls",
  authDomain: "bole-toh-pahadi-podcast-e0154.firebaseapp.com",
  projectId: "bole-toh-pahadi-podcast-e0154",
  storageBucket: "bole-toh-pahadi-podcast-e0154.appspot.com",
  messagingSenderId: "467497454690",
  appId: "1:467497454690:web:c73babc76201291277953b"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(app);
export default db;



