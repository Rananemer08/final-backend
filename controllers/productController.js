import Product from "../models/productModel.js";
import mongoose from "mongoose";

import Category from "../models/categoryModel.js";
import { parse } from "dotenv";




const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      productCharacteristics,
      price,
      inStock,
      quantity,
      bestSeller,
    } = req.body;
    // const image = req.file?.path;
    const images = req.files ? req.files.map(file => file.filename) : [];

    // if (
    //   !title ||
    //   !description ||
    //   // !images ||
    //   !category ||
    //   // !productCharacteristics ||
    //   !price ||
    //   !inStock ||
    //   !quantity ||
    //   !bestSeller
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     status: 400,
    //     message: "Please provide all required fields for the product",
    //   });    
    // }
    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        status: 404,
        data: null,
      });
    }

    const newProduct = new Product({
      title,
      description,
      category: existingCategory._id,
      productCharacteristics,
      price,
      inStock,
      quantity,
      bestSeller,
      images,
    });

    const savedProduct = await newProduct.save();

    // existingCategory.products.push(savedProduct._id);
    // await existingCategory.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      status: 201,
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create a new product",
      status: 500,
      data: null,
    });
  }
};


// controllers/productController.js
// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find({})
//       .sort({ createdAt: -1 })
//       .select("-__v")
//       .populate("category"); // Populate the 'category' field

//     // Extract all unique sizes and colors from the products
//     const sizes = [...new Set(products.flatMap(product => product.productCharacteristics.map(item => item.size)))];
//     const colors = [...new Set(products.flatMap(product => product.productCharacteristics.map(item => item.color)))];

//     res.status(200).json({
//       success: true,
//       message: "Products retrieved successfully",
//       status:  200,
//       data: {
//         products,
//         sizes,
//         colors
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve products",
//       status:  500,
//       data: null,
//     });
//   }
// };

  

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .select("-__v")
      .populate("category"); // Populate the 'category' field
    //   const colors = await Color.find({}); 
    // const sizes = await Size.find({}); 
    

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      status: 200,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
      status: 500,
      data: null,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not valid id format" });
    }

    const product = await Product.findById(id)
      .select("-__v")
      .populate("category"); // Populate the 'category' field

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        status: 404,
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      status: 200,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve the requested product",
      status: 500,
      data: null,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      productCharacteristics,
      price,
      inStock,
      quantity,
      bestSeller,
    } = req.body;

    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Product ID is required for the update",
      });
    }

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        status: 404,
        data: null,
      });
    }

    if (title) existingProduct.title = title;
    if (description) existingProduct.description = description;

    if (category) {
      const existingCategory = await Category.findById(category);

      if (!existingCategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
          status: 404,
          data: null,
        });
      }

      existingProduct.category = existingCategory._id;
    }

    if (price) existingProduct.price = price;
    if (inStock !== undefined) existingProduct.inStock = inStock;
    if (quantity) existingProduct.quantity = quantity;
    if (bestSeller !== undefined) existingProduct.bestSeller = bestSeller;
    if (productCharacteristics !== undefined) existingProduct.productCharacteristics = productCharacteristics;

    if (req.files) {
      const newImages = req.files.map(file => file.filename);
      existingProduct.images = newImages;
    }

    const updatedProduct = await existingProduct.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      status: 200,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update the product",
      status: 500,
      data: null,
    });
  }
};


const getProductsByCategoryId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID format",
        status: 400,
      });
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

    const products = await Product.find({ category: id }).populate("category");

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
      error: error.message,
      status: 500,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not valid id format" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        status: 404,
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      status: 200,
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete the Product",
      status: 500,
      data: null,
    });
  }
};
// controllers.js

export const getFilterOptions = async (req, res) => {
  try {
    const sizes = await Product.distinct("productCharacteristics.size");
    const colors = await Product.distinct("productCharacteristics.color");
    const prices = await Product.distinct("price");

    res.status(200).json({
      success: true,
      message: "Filter options retrieved successfully",
      status: 200,
      data: {
        sizes,
        colors,
        prices,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve filter options",
      status: 500,
      data: null,
    });
  }
};
export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
};