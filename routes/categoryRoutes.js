import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Create
router.post("/categories", upload.single("image"), createCategory);

// Get all
router.get("/categories", getAllCategories);

// Get single
router.get("/categories/:id", getCategoryById);

// Update
router.put("/categories/:id", upload.single("image"), updateCategory);

// Delete
router.delete("/categories/:id", deleteCategory);

export default router;
