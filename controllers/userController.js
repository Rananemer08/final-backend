import User from "../models/userModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import validator from "validator";
import upload from "../middlewares/uploadMiddleware.js";

const hashPassword = async function (password) {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

// const loginAdmin = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide both username and password',
//       });
//     }

//     const admin = await User.findOne({ username, userType: 'admin' });

//     if (!admin) {
//       return res.status(404).json({
//         success: false,
//         message: 'Wrong username or password',
//       });
//     }

//     const passwordMatch = await bcrypt.compare(password, admin.password);

//     if (!passwordMatch) {
//       return res.status(401).json({
//         success: false,
//         message: 'Wrong username or password',
//       });
//     }

//     const token = jwt.sign(
//       {
//         id: admin.id,
//         username: admin.username,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: process.env.JWT_EXPIRATION,
//       }
//     );

//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       accessToken: token,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to process login request',
//     });
//   }
// };

// const createAdmin = async (req, res) => {
//   try {
//     const { fullName, username, password, address, phoneNumber } = req.body;

//     if (!fullName || !username || !password || !address || !phoneNumber) {
//       return res.status(400).json({
//         success: false,
//         status: 400,
//         message: 'Please provide all required fields',
//       });
//     }

//     const hashedPassword = await hashPassword(password);
//     const newAdmin = new User({
//       fullName,
//       username,
//       password: hashedPassword,
//       address,
//       phoneNumber,
//       userType: 'admin',
//     });

//     const savedAdmin = await newAdmin.save();
//     res.status(201).json({
//       success: true,
//       message: 'Admin created successfully',
//       status: 201,
//       data: savedAdmin,
//     });
//   } catch (error) {
//     console.error(error);
//     if (error.code === 11000) {
//       res.status(500).json({
//         success: false,
//         message: 'username already exists',
//         status: 500,
//         data: null,
//       });
//     } else {
//       res.status(500).json({
//         success: false,
//         message: error.message || 'Failed to create a new admin',
//         status: 500,
//         data: null,
//       });
//     }
//   }
// };

// const createUser = async (req, res) => {
//   try {
//     const { fullName, username, password, email, address, phoneNumber } = req.body;

//     if (!fullName || !username || !password || !email || !address || !phoneNumber) {
//       return res.status(400).json({
//         success: false,
//         status: 400,
//         message: 'Please provide all required fields',
//         data: null,
//       });
//     }

//     const hashedPassword = await hashPassword(password);

//     const newUser = new User({
//       fullName,
//       username,
//       password: hashedPassword,
//       email,
//       address,
//       phoneNumber,
//       userType: 'user',
//     });

//     const savedUser = await newUser.save();
//     res.status(201).json({
//       success: true,
//       message: 'User created successfully',
//       status: 201,
//       data: savedUser,
//     });
//   } catch (error) {
//     console.error(error);
//     if (error.code === 11000) {
//       res.status(500).json({
//         success: false,
//         message: 'username already exists',
//         status: 500,
//         data: null,
//       });
//     } else {
//       res.status(500).json({
//         success: false,
//         message: error.message || 'Failed to create a new user',
//         status: 500,
//         data: null,
//       });
//     }
//   }
// };

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide both email and password',
//       });
//     }

//     const user = await User.findOne({ email, userType: 'user' });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'Wrong email or password',
//       });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({
//         success: false,
//         message: 'Wrong email or password',
//       });
//     }

//     const token = jwt.sign(
//       {
//         id: user.id,
//         email: user.email,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: process.env.JWT_EXPIRATION,
//       }
//     );

//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       accessToken: token,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to process login request',
//     });
//   }
// };


export const userRegister = async (req, res) => {
  const { firstName, lastName, username, password, email, phoneNumber,address, userType } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already in use!" });
    }

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      userType,
    });

    const savedUser = await newUser.save();
    const token = jwt.sign(
      { id: savedUser._id, userType: savedUser.userType },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ message: "User created successfully!", user: savedUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


export const userLogin = async (req, res) => {
  const { username, password } = req.body;
  const secretKey = process.env.JWT_SECRET;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password!' });
    }

    const token = jwt.sign({ user: user.id }, secretKey, { expiresIn: '1h' });


    // Set the JWT token in the cookie
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });

    // Set the user's role in the cookie
    res.cookie('userrole', user.role, { httpOnly: false });

    // Set the user's ID in the cookie
    res.cookie("userId", user.id, { httpOnly: false });

    res.status(200).json({ message: 'Logged in successfully!', user: user.id,token:token });
console.log("logged in successfully")
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not valid id format" });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        status: 404,
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      status: 200,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve the requested user",
      status: 500,
      data: null,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .sort({ createdAt: -1 })
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      status: 200,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
      status: 500,
      data: null,
    });
  }
};

const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const image = req.file?.path;
      const { password, address, img, fullName, username, phoneNumber, userType } = req.body;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Not valid id format" });
      }
  
      const existingUser = await User.findById(id);
  
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
          status: 404,
          data: null,
        });
      }
  
      if (password) {
        if (!validator.isStrongPassword(password)) {
          return res.status(400).json({
            success: false,
            status: 400,
            message: "Password is not strong enough",
          });
        }
  
        const hashedPassword = await hashPassword(password);
        req.body.password = hashedPassword;
      }
  
      if (address) {
        const updatedAddress = { ...existingUser.address, ...address };
        req.body.address = updatedAddress;
      }
  
      const updateFields = req.body;
      if (image) {
        updateFields.image = image;
      }
  
      // Update all other fields individually
      if (fullName) {
        req.body.fullName = fullName;
      }
  
      if (username) {
        req.body.username = username;
      }
  
      if (phoneNumber) {
        req.body.phoneNumber = phoneNumber;
      }
  
      if (userType) {
        req.body.userType = userType;
      }
  
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
  
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "Failed to update user",
          status: 404,
          data: null,
        });
      }
  
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        status: 200,
        data: updatedUser,
      });
    } catch (error) {
      if (error.code === 11000) {
        res.status(500).json({
          success: false,
          message: "Email already exists",
          status: 500,
          data: null,
        });
      } else {
        res.status(500).json({
          success: false,
          message: error.message || "Failed to update the user",
          status: 500,
          data: null,
        });
      }
    }
  };
  

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not valid id format" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        status: 404,
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      status: 200,
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete the user",
      status: 500,
      data: null,
    });
  }
};


export { updateUser,getAllUsers,getUserById,deleteUser };
