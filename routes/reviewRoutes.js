import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

// Create a new review
router.post("/reviews", createReview);

// Get all reviews
router.get("/reviews", getAllReviews);

// Get review by ID
router.get("/reviews/:id", getReviewById);

// Update review by ID
router.put("/reviews/:id", updateReview);

// Delete review by ID
router.delete("/reviews/:id", deleteReview);

export default router;
