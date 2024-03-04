import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
  getFilterOptions
} from "../controllers/productController.js";
import { authenticateToken } from "../middlewares/auth.js";
import upload from "../middlewares/uploadMiddleware.js"; // Import the image upload middleware

const router = express.Router();

// Create a new product with image upload middleware
router.post("/products", upload.array("images"), createProduct);

// Get all products
router.get("/products", getAllProducts);

// Get product by ID
router.get("/products/:id", getProductById);

// Update product by ID with image upload middleware
router.put("/products/:id", upload.array("images"), updateProduct);

// Delete product by ID
router.delete("/products/:id", deleteProduct);

// Get products by category ID
router.get("/products/category/:id", getProductsByCategoryId);

router.get("/products/sizes-colors", getFilterOptions);

export default router;
