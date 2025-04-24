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
const COLLECTION_NAME = "categories";

// Create a category
const createCategory = async (categoryData) => {
  try {
    const categoryRef = doc(collection(db, COLLECTION_NAME));
    const category = {
      id: categoryRef.id,
      name: categoryData.name,
      slug: categoryData.slug,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await setDoc(categoryRef, category);
    return category;
  } catch (error) {
    throw error;
  }
};

// Get category by ID
const getCategoryById = async (categoryId) => {
  try {
    const categoryRef = doc(db, COLLECTION_NAME, categoryId);
    const categorySnap = await getDoc(categoryRef);
    if (categorySnap.exists()) {
      return { id: categorySnap.id, ...categorySnap.data() };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

// Get category by slug
const getCategoryBySlug = async (slug) => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    let category = null;
    querySnapshot.forEach((doc) => {
      category = { id: doc.id, ...doc.data() };
    });
    return category;
  } catch (error) {
    throw error;
  }
};

// Update category
const updateCategory = async (categoryId, categoryData) => {
  try {
    const categoryRef = doc(db, COLLECTION_NAME, categoryId);
    await updateDoc(categoryRef, {
      ...categoryData,
      updatedAt: new Date(),
    });
    return { id: categoryId, ...categoryData };
  } catch (error) {
    throw error;
  }
};

// Delete category
const deleteCategory = async (categoryId) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, categoryId));
    return true;
  } catch (error) {
    throw error;
  }
};

// Get all categories
const getAllCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const categories = [];
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    return categories;
  } catch (error) {
    throw error;
  }
};

export default {
  createCategory,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
  getAllCategories,
};
