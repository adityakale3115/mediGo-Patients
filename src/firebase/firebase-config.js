// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDloJksK8MFJmuaygcMHHlCpFU6QJuQJqY",
  authDomain: "medigo-for-patients.firebaseapp.com",
  databaseURL: "https://medigo-for-patients-default-rtdb.firebaseio.com",
  projectId: "medigo-for-patients",
  storageBucket: "medigo-for-patients.firebasestorage.app",
  messagingSenderId: "493405266427",
  appId: "1:493405266427:web:9a32ee8cc50a3d0ae3eb5e",
  measurementId: "G-11Y9X5LEMK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
export default app;
const db = getFirestore(app);

export { db };