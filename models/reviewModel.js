import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

// Pre-find middleware to automatically populate the 'user' and 'product' fields with user and product data
reviewSchema.pre("find", function (next) {
  console.log("Pre-find middleware for find");
  this.populate("userId").populate("productId");
  next();
});

// Pre-findOne middleware to automatically populate the 'user' and 'product' fields with user and product data
reviewSchema.pre("findOne", function (next) {
  console.log("Pre-find middleware for findOne");
  this.populate("userId").populate("productId");
  next();
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
