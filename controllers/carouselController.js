import mongoose from "mongoose";
import Carousel from "../models/carouselModel.js";

//create carousel
const createCarousel = async (req, res) => {
  try {
    const { title } = req.body;    
    const { subtitle } = req.body;
    const image = req.file?.path;

    if (!image || !title|| !subtitle) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Please provide image, title and subtitle",
      });
    }

    const newCarousel = new Carousel({ image: image, title,subtitle });

    const savedCarousel = await newCarousel.save();
    res.status(201).json({
      success: true,
      message: "Carousel created successfully",
      status: 201,
      data: savedCarousel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create a new carousel",
      status: 500,
      data: null,
    });
  }
};

// read one carousel
const getCarouselById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not valid id format" });
    }

    const carousel = await Carousel.findById(id);

    if (!carousel) {
      return res.status(404).json({
        success: false,
        message: "carousel not found",
        status: 404,
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "carousel retrieved successfully",
      status: 200,
      data: carousel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve the requested carousel",
      status: 500,
      data: null,
    });
  }
};

//read all carousel
const getAllCarousels = async (req, res) => {
  try {
    const carousel = await Carousel.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "carousels retrieved successfully",
      status: 200,
      data: carousel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve carousels",
      status: 500,
      data: null,
    });
  }
};

//update carousel
const updateCarousel = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.file?.path;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not valid id format" });
    }

    const existingCarousel = await Carousel.findById(id);

    if (!existingCarousel) {
      return res.status(404).json({
        success: false,
        message: "Carousel not found",
        status: 404,
        data: null,
      });
    }

    const updateFields = req.body;
    if (image) {
      updateFields.image = image;
    }

    const updatedCarousel = await Carousel.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedCarousel) {
      return res.status(404).json({
        success: false,
        message: "Failed to update carousel",
        status: 404,
        data: null,
      });
    }
    // return
    res.status(200).json({
      success: true,
      message: "Carousel updated successfully",
      status: 200,
      data: updatedCarousel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update the carousel",
      status: 500,
      data: null,
    });
  }
};

//delete a carousel
const deleteCarousel = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not valid id format" });
    }

    const deletedCarousel = await Carousel.findByIdAndDelete(id);

    if (!deletedCarousel) {
      return res.status(404).json({
        success: false,
        message: "carousel not found",
        status: 404,
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "carousel deleted successfully",
      status: 200,
      data: deletedCarousel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete the carousel",
      status: 500,
      data: null,
    });
  }
};

export {
  createCarousel,
  getCarouselById,
  getAllCarousels,
  updateCarousel,
  deleteCarousel,
};
