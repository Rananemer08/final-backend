// import express from "express";
// import { createUser, createAdmin, loginUser, loginAdmin, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";
// import { authenticateToken } from "../middlewares/auth.js";

// const router = express.Router();

// // Public route for user registration
// router.post("/users", createUser);

// // Public route for admin registration
// router.post("/admins", createAdmin);

// // Public route for user login
// router.post("/users/login", loginUser);

// // Public route for admin login
// router.post("/admins/login", loginAdmin);

// // Protected route to get all users (accessible only by admin)
// router.get("/users", getAllUsers);

// // Protected route to get a user by ID (accessible by both user and admin)
// router.get("/users/:id", getUserById);

// // Protected route to update a user (accessible by both user and admin)
// router.put("/users/:id",  updateUser);

// // Protected route to delete a user (accessible only by admin)
// router.delete("/users/:id", deleteUser);

// export default router;
import express from "express";
import { userRegister, userLogin, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";
 import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

// Public route for user registration
// router.post("/users/register", userRegister);
// Public route for admin registration
// router.post("/users/register/admin", userRegister);

// Public route for user registration
router.post("/register", userRegister);
;
// Public route for user login
router.post("/users/login", userLogin);

// Protected route to get all users (accessible only by admin)
router.get("/users",getAllUsers);

// Protected route to get a user by ID (accessible by both user and admin)
router.get("/users/:id", getUserById);

// Protected route to update a user (accessible by both user and admin)
router.put("/users/:id", updateUser);

// Protected route to delete a user (accessible only by admin)
router.delete("/users/:id", deleteUser);

export default router;
