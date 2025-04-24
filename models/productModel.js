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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../config/db.js";

// Define collection name
const COLLECTION_NAME = "products";
const storage = getStorage(app);

// Create a product
const createProduct = async (productData, photoFile) => {
  try {
    const productRef = doc(collection(db, COLLECTION_NAME));

    // Handle photo upload
    let photoURL = null;
    if (photoFile) {
      const storageRef = ref(storage, `products/${productRef.id}`);
      await uploadBytes(storageRef, photoFile);
      photoURL = await getDownloadURL(storageRef);
    }

    const product = {
      id: productRef.id,
      name: productData.name,
      slug: productData.slug,
      description: productData.description,
      price: parseFloat(productData.price),
      category: productData.category,
      quantity: parseInt(productData.quantity),
      photoURL: photoURL,
      shipping: productData.shipping === "1" || productData.shipping === true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(productRef, product);
    return product;
  } catch (error) {
    throw error;
  }
};

// Get product by ID
const getProductById = async (productId) => {
  try {
    const productRef = doc(db, COLLECTION_NAME, productId);
    const productSnap = await getDoc(productRef);
    if (productSnap.exists()) {
      return { id: productSnap.id, ...productSnap.data() };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

// Get product by slug
const getProductBySlug = async (slug) => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    let product = null;
    querySnapshot.forEach((doc) => {
      product = { id: doc.id, ...doc.data() };
    });
    return product;
  } catch (error) {
    throw error;
  }
};

// Update product
const updateProduct = async (productId, productData, photoFile) => {
  try {
    const productRef = doc(db, COLLECTION_NAME, productId);

    // Handle photo upload if new photo provided
    if (photoFile) {
      const storageRef = ref(storage, `products/${productId}`);
      await uploadBytes(storageRef, photoFile);
      productData.photoURL = await getDownloadURL(storageRef);
    }

    // Update numeric fields
    if (productData.price) {
      productData.price = parseFloat(productData.price);
    }

    if (productData.quantity) {
      productData.quantity = parseInt(productData.quantity);
    }

    if (productData.shipping !== undefined) {
      productData.shipping =
        productData.shipping === "1" || productData.shipping === true;
    }

    await updateDoc(productRef, {
      ...productData,
      updatedAt: new Date(),
    });

    return { id: productId, ...productData };
  } catch (error) {
    throw error;
  }
};

// Delete product
const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, productId));
    // Could also delete the photo from storage here if needed
    return true;
  } catch (error) {
    throw error;
  }
};

// Get all products
const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    throw error;
  }
};

// Get products by category
const getProductsByCategory = async (categoryId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("category", "==", categoryId)
    );
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    throw error;
  }
};

export default {
  createProduct,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductsByCategory,
};
