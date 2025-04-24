// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFwGTJNnZnUbYwsDn2SzpPjPeMVM_TzBA",
  authDomain: "mern-ecommerce-applicaion.firebaseapp.com",
  projectId: "mern-ecommerce-applicaion",
  storageBucket: "mern-ecommerce-applicaion.firebasestorage.app",
  messagingSenderId: "177255088932",
  appId: "1:177255088932:web:3fa5b0bb1b385594be29b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const connectDB = async () => {
  try {
    console.log(`Firebase Connected`.bgMagenta.white);
    return db;
  } catch (error) {
    console.log(`Error connecting to Firebase: ${error}`.bgRed.white);
  }
};

export default connectDB;
export { db, app };
