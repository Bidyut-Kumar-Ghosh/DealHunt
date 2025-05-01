// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, Auth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

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

// Initialize Firebase Auth
const auth: Auth = getAuth(app);

// We have removed the persistence for now to simplify the setup
// and avoid the "getReactNativePersistence" import error

// Export default component required by Expo Router
export default function FirebaseConfig() {
    return null;
}

// Export auth for use in the app
export { auth }; 