import Category from "../models/categoryModel.js";
import mongoose from "mongoose";

const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const image = req.file?.path;

    if (!categoryName || !image) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Please provide all required fields",
      });
    }

    const newCategory = new Category({ categoryName, image: image });
    const savedCategory = await newCategory.save();
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      status: 201,
      data: savedCategory,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(500).json({
        success: false,
        message: "Category Name already exists",
        status: 500,
        data: null,
      });
    } else {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to create a new category",
        status: 500,
        data: null,
      });
    }
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .sort({ createdAt: -1 })
      .select("-__v");
    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      status: 200,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve categories",
      status: 500,
      data: null,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not valid id format" });
    }

    const category = await Category.findById(id).select("-__v");

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        status: 404,
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      status: 200,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve the requested category",
      status: 500,
      data: null,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.file?.path;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not valid id format" });
    }

    const existingCategory = await Category.findById(id);

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        status: 404,
        data: null,
      });
    }

    const updateFields = req.body;
    if (image) {
      updateFields.image = image;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Failed to update category",
        status: 404,
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      status: 200,
      data: updatedCategory,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(500).json({
        success: false,
        message: "Category Name already exists",
        status: 500,
        data: null,
      });
    } else {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to update the category",
        status: 500,
        data: null,
      });
    }
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not valid id format" });
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        status: 404,
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      status: 200,
      data: deletedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete the category",
      status: 500,
      data: null,
    });
  }
};

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};