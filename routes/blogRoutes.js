import express from "express";
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
  deleteAllBlogs,
} from "../controllers/blogController.js";
import upload from "../middlewares/uploadMiddleware.js";
// import Protect from "../middleware/authMiddleware.js";
const router = express.Router();

// you can write it in this syntax (less lines of code)
router
  .route("/blogs")
  .get(getAllBlogs)
  .post(upload.single("image"), createBlog)
  .delete(deleteAllBlogs);

router
  .route("/blogs/:id")
  .put(upload.single("image"), updateBlog)
  .delete(deleteBlog)
  .get(getBlogById);

export default router;