import express from "express";
import {
  createCarousel,
  getCarouselById,
  getAllCarousels,
  updateCarousel,
  deleteCarousel,
} from "../controllers/carouselController.js";

import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

//create
router.post("/carousels", upload.single("image"), createCarousel);

//get all
router.get("/carousels", getAllCarousels);

//get single
router.get("/carousels/:id", getCarouselById);

//update
router.put("/carousels/:id", upload.single("image"), updateCarousel);

//delete
router.delete("/carousels/:id", deleteCarousel);

export default router;