import Blog from "../models/blogModel.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

// GET all Blogs
const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "blogs retrieved successfully",
      status: 200,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to retrieve blogs",
      status: 500,
      data: null,
    });
  }
});

// GET a single Blog
const getBlogById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "not a valid ID",
        status: 404,
        data: null,
      });
    }
    const singleBlog = await Blog.findById(id);

    if (!singleBlog) {
      return res.status(404).json({
        success: false,
        message: "blog not found",
        status: 404,
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "blog retrieved successfully",
      status: 200,
      data: singleBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to retrieve the requested blog",
      status: 500,
      data: null,
    });
  }
});

// CREATE a new Blog
const createBlog = asyncHandler(async (req, res) => {
  try {
    const image = req.file?.path;

    // if (Object.keys(req.body).length !== 3 || !image)
    const { title, text, date } = req.body;
    if (!title || !text || !date || !image) {
      res.status(404).json({
        success: false,
        message: "please add all fields",
        status: 404,
        data: null,
      });
    } else {
      const newBlog = await Blog.create({ ...req.body, image: image });
      res.status(201).json({
        success: true,
        message: "blog created successfully",
        status: 200,
        data: newBlog,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "failed to create blog",
      status: 500,
      data: null,
    });
  }
});

// UPDATE a Blog
const updateBlog = asyncHandler(async (req, res) => {
  // if u need to update a field without updating the image we check if req.file is available so we updated else we update the needed field(req.body)
  let image;
  if (req.file) {
    image = req.file.path;
  }
  // checking if the type ID is valid for security reasons
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "not a valid ID",
        status: 404,
        data: null,
      });
    }
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "blog not found",
        status: 404,
        data: null,
      });
    } else {
      // new:true to return the new updated object
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { ...req.body, image: image },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "blog updated successfully",
        status: 200,
        data: updatedBlog,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to update the requested blog",
      status: 500,
      data: null,
    });
  }
});

// DELETE a Blog
const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "not a valid ID",
        status: 404,
        data: null,
      });
    }

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "blog not found",
        status: 404,
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "blog deleted successfully",
        status: 200,
        data: blog,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to delete the requested blog",
      status: 500,
      data: null,
    });
  }
});

// DELETE all blog posts
const deleteAllBlogs = asyncHandler(async (req, res) => {
  try {
    // const blog = await Blog.deleteMany({});
    res.status(200).json({ message: "delete all blog posts" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  deleteAllBlogs,
};
