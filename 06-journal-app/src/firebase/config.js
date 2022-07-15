import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCRXUkbMj2nP5zkyBWwLc4COFSLmIMH_w",
  authDomain: "react-course-f2adf.firebaseapp.com",
  projectId: "react-course-f2adf",
  storageBucket: "react-course-f2adf.appspot.com",
  messagingSenderId: "941913925667",
  appId: "1:941913925667:web:acb24a02d53aecaea9a996"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
