import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    // images: [{
    //   type: String,
    //   required: true,
    // }],
    images: [
      {
        type: String,
      },
    ],
    
    
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    // size: [{
    //   type: String,
    //   trim: true,
    // }],
    // color: [{
    //   type: String,
    //   trim: true,
    // }],

    productCharacteristics: [{
      size: String,
      color: String,
      quantity: Number,
    }],
    
    price: {
      type: Number,
      required: true,
    },

    inStock: {
      type: Boolean,
      default: true,
    },
    bestSeller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-find middleware to automatically populate the 'category' field with category data
productSchema.pre("find", function (next) {
  this.populate("category");
  next();
});

// Pre-findOne middleware to automatically populate the 'category' field with category data
productSchema.pre("findOne", function (next) {
  this.populate("category");
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
