import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: [true, "Username already exists"],
      validate: {
        validator: (value) => {
          return value.length >= 4;
        },
        message: "Username must be at least 4 characters long",
      },
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already exists"],
      lowercase: true,
      validate: {
        validator: (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    phoneNumber: {
      type: String,
      // required: true,
      maxlength: 15,
      validate: {
        validator: (value) => {
          const phoneRegex = /^[0-9]+$/;
          return phoneRegex.test(value);
        },
        message: "Please enter a valid phone number",
      },
    },
    img: {
      type: String,
      required:false, // Make img field optional
    },
    address: {
      city: {
        type: String,
        // required: true,
      },
      street: {
        type: String,
        // required: true,
      },
      bldg: {
        type: String,
        // required: true,
      },
      addressDetails: {
        type: String,
      },
    },
    userType: {
      type: String,
      enum: ['admin', 'user'], // Allow only 'admin' or 'user'
      default: 'user', // Default value is 'user'
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
