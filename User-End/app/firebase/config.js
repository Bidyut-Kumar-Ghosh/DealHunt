// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

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

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
export default app;
