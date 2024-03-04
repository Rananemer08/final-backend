import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";


// Middlewares
import connectToDatabase from "./config/connection.js";
import logRequestBody from "./middlewares/requestBodyData.js";
import { authenticateToken } from "./middlewares/auth.js";

// Routes
// import authRoutes from "./routes/authRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import carouselRoutes from "./routes/carouselRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import orderRoutes from "./routes/order.Routes.js";
import cookieParser from 'cookie-parser';
// import storyRoutes from "./routes/storyRoutes.js";
// import collectionRoutes from "./routes/collectionRoutes.js";

dotenv.config();

const app = express();
app.use(cookieParser());
// Connect to MongoDB
connectToDatabase();

// Enable CORS
app.use(cors('*'));


// Enable CORS
// app.use(cors({ origin: "http://localhost:5173" }));



// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static("./"));

// Middleware to log request details
app.use(logRequestBody);

// authentication routes
// app.use("/api", authRoutes);
// Add a new endpoint to get colors and sizes
app.get("/api/products/colorsAndSizes", async (req, res) => {
  try {
   const allProducts = await Product.find({});
   const colors = [...new Set(allProducts.flatMap(product => product.productCharacteristics.map(pc => pc.color)))];
   const sizes = [...new Set(allProducts.flatMap(product => product.productCharacteristics.map(pc => pc.size)))];
 
   res.status(200).json({
    success: true,
    message: "Colors and sizes retrieved successfully",
    status: 200,
    data: { colors, sizes },
   });
  } catch (error) {
   res.status(500).json({
    success: false,
    message: "Failed to retrieve colors and sizes",
    status: 500,
    data: null,
   });
  }
 });
 

// all the other routes
// app.use("/api", adminRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", categoryRoutes);
app.use("/api", carouselRoutes);
app.use("/api", blogRoutes);
app.use("/api",reviewRoutes);
// app.use("/api", storyRoutes);
// app.use("/api", collectionRoutes);

// app.use("/api", authenticateToken ,adminRoutes);// protected routes should be like this
// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));


app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);





