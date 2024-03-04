import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // not required for now client said she may want it later on
      ref: "User",
    },
    total: {
      type: Number,
    //   required: true,
      min: 0,
    //   default: 0,
    },
    paymentMethod: {
      type: String,
      enum: ["CreditCard", "CashOnDelivery"],
      default: "CashOnDelivery",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveryCharge: {
      type: Number,
      default: 0,
    },
    shippingCharge: {
        type: Number,
        default: 0,
      },
    deliveryAddress: {
      receiverName: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      building: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      addressDetails: {
        type: String,
      },
    },
    status: { type: String, default: "pending" },
    products: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          size: {
            type:String,
            required: true,
          },
          color: {
            type:String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      validate: {
        validator: function (products) {
          return products.length > 0;
        },
        message: "At least one product is required.",
      },
    },
  },
  { timestamps: true }
);

orderSchema.pre("findOne", function (next) {
    this.populate("userId");
    this.populate("products.productId");
    next();
  });
  
  orderSchema.pre("find", function (next) {
    this.populate("userId");
    this.populate("products.productId");
    next();
  });
  

const Order = mongoose.model("Order", orderSchema);

export default Order;
