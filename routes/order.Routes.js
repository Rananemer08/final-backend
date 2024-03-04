import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// Create a new order
router.post("/orders", createOrder);

// Get all orders
router.get("/orders", getAllOrders);

// Get a specific order by ID
router.get("/orders/:id", getOrderById);

// Update an order
router.put("/orders/:id", updateOrder);

// Delete an order
router.delete("/orders/:id", deleteOrder);

export default router;