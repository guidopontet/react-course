import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
// Dev/Prod
const firebaseConfig = {
  apiKey: "AIzaSyDCRXUkbMj2nP5zkyBWwLc4COFSLmIMH_w",
  authDomain: "react-course-f2adf.firebaseapp.com",
  projectId: "react-course-f2adf",
  storageBucket: "react-course-f2adf.appspot.com",
  messagingSenderId: "941913925667",
  appId: "1:941913925667:web:acb24a02d53aecaea9a996"
};

// Testing
// const firebaseConfig = {
//   apiKey: "AIzaSyDp-oJE82YW5sXrXCy9sOz_Gl_KozzkoM0",
//   authDomain: "react-course-testing-83a52.firebaseapp.com",
//   projectId: "react-course-testing-83a52",
//   storageBucket: "react-course-testing-83a52.appspot.com",
//   messagingSenderId: "504208051968",
//   appId: "1:504208051968:web:dfeacf1ccb2b7b8e00ade5"
// };

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
