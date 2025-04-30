// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  GoogleAuthProvider,
} from "firebase/auth";
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

// Initialize Firebase Auth with platform-specific settings
let auth;
// Use initializeAuth with AsyncStorage persistence for React Native platforms
if (Platform.OS !== "web") {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  // Use standard getAuth for web platform
  auth = getAuth(app);
}

// Create Google provider with appropriate scopes
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export { auth, googleProvider };
export default app;
