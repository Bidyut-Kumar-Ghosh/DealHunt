import { db } from "../config/db.js";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

// Define collection name
const COLLECTION_NAME = "users";

// Create a user
const createUser = async (userData) => {
  try {
    const userRef = doc(collection(db, COLLECTION_NAME));
    const user = {
      id: userRef.id,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      address: userData.address,
      answer: userData.answer,
      role: userData.role || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await setDoc(userRef, user);
    return user;
  } catch (error) {
    throw error;
  }
};

// Get user by ID
const getUserById = async (userId) => {
  try {
    const userRef = doc(db, COLLECTION_NAME, userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

// Get user by email
const getUserByEmail = async (email) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(q);
    let user = null;
    querySnapshot.forEach((doc) => {
      user = { id: doc.id, ...doc.data() };
    });
    return user;
  } catch (error) {
    throw error;
  }
};

// Update user
const updateUser = async (userId, userData) => {
  try {
    const userRef = doc(db, COLLECTION_NAME, userId);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: new Date(),
    });
    return { id: userId, ...userData };
  } catch (error) {
    throw error;
  }
};

// Delete user
const deleteUser = async (userId) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, userId));
    return true;
  } catch (error) {
    throw error;
  }
};

// Get all users
const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  } catch (error) {
    throw error;
  }
};

export default {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  getAllUsers,
};
