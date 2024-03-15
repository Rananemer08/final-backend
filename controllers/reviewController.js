import Review from "../models/reviewModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

// const createReview = async (req, res) => {
//   try {
//     const { userId, productId, text } = req.body;

//     // Check if user ID and product ID exist
//     if (!userId || !productId || !text ) {
//       return res.status(400).json({
//         success: false,
//         message: "User ID and product ID and text are required",
//         status: 400,
//         data: null,
//       });
//     }

//     const review = new Review({
//       user: userId,
//       product: productId,
//       text: text,
//     });

//     const createdReview = await review.save();

//     res.status(201).json({
//       success: true,
//       message: "Review created successfully",
//       status: 201,
//       data: createdReview,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to create the review",
//       status: 500,
//       data: null,
//     });
//   }
// };

const createReview = async (req, res) => {
  try {
    const { userId, productId, text } = req.body;
  console.log("dd",req.body)
    // Check if user ID and product ID exist
    if (!userId  || !text) {
      return res.status(400).json({
        success: false,
        message: "User ID, product ID, and text are required",
        status: 400,
        data: null,
      });

    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        status: 404,
        data: null,
      });
    }

    // const existingProduct = await Product.findById(productId);
    // if (!existingProduct) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Product not found",
    //     status: 404,
    //     data: null,
    //   });
    // }

    // Use the correct field names for creating the review
    const review = new Review({
      userId: userId,
     
      text: text,
    });

    const createdReview = await review.save();

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      status: 201,
      data: createdReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create the review",
      status: 500,
      data: null,
    });
  }
};



const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
    .populate("userId", "_id username email")
    .populate("productId", "_id name description price")
    
      .sort({ createdAt: -1 })
      .select("-__v");
      console.log("Reviews:", reviews);

    res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully",
      status: 200,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve reviews",
      status: 500,
      data: null,
    });
  }
};

// const getReviewById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).json({ error: "Not valid id format" });
//     }

//     const review = await Review.findById(id)
//       .populate("user")
//       .populate("product")
//       .select("-__v");

//     if (!review) {
//       return res.status(404).json({
//         success: false,
//         message: "Review not found",
//         status: 404,
//         data: null,
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Review retrieved successfully",
//       status: 200,
//       data: review,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve the requested review",
//       status: 500,
//       data: null,
//     });
//   }
// };

const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, error: "Not valid id format" });
    }

    const review = await Review.findById(id)
      .populate("userId", "_id username email")  // Adjust fields as per your User model
      .populate("productId", "_id name description price")

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
        status: 404,
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Review retrieved successfully",
      status: 200,
      data: review,
    });
  } catch (error) {
    console.error("Error in getReviewById:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve the requested review",
      status: 500,
      error: error.message,  // Include the error message for debugging
      data: null,
    });
  }
};


// const updateReview = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { userId, productId, text } = req.body;

//     // Check if user ID and product ID exist
//     if (!userId || !productId) {
//       return res.status(400).json({
//         success: false,
//         message: "User ID and product ID are required",
//         status: 400,
//         data: null,
//       });
//     }

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).json({ error: "Not valid id format" });
//     }

//     const existingReview = await Review.findById(id);

//     if (!existingReview) {
//       return res.status(404).json({
//         success: false,
//         message: "Review not found",
//         status: 404,
//         data: null,
//       });
//     }

//     existingReview.user = userId;
//     existingReview.product = productId;
//     existingReview.text = text;

//     const updatedReview = await existingReview.save();

//     res.status(200).json({
//       success: true,
//       message: "Review updated successfully",
//       status: 200,
//       data: updatedReview,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to update the review",
//       status: 500,
//       data: null,
//     });
//   }
// };


const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, productId, text } = req.body;

    // Check if user ID and product ID exist
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "User ID and product ID are required",
        status: 400,
        data: null,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not a valid ID format" });
    }

    const existingReview = await Review.findById(id);
    if (!existingReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
        status: 404,
        data: null,
      });
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        status: 404,
        data: null,
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

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { user: userId, product: productId, text },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      status: 200,
      data: updatedReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update the review",
      status: 500,
      data: null,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not valid id format" });
    }

    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
        status: 404,
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      status: 200,
      data: deletedReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete the review",
      status: 500,
      data: null,
    });
  }
};

export {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};