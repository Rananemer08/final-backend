import multer from "multer";

// Create a storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});


// Define the file filter to accept only image files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null,true)
    } else {
      cb(new Error('Only image files are allowed. Please upload a valid image file.'), false);
    }
};

const upload = multer({ storage ,fileFilter});
export default upload;
// import multer from "multer";

// // Create a storage engine
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads/");
//   },
//   filename: (req, file, cb) => {
//     const sanitizedOriginalname = file.originalname.replace(/[\\/]/g, "_"); // Replace both forward and backslashes with underscore
//     cb(null, new Date().toISOString().replace(/:/g, "-") + sanitizedOriginalname);
//   },
// });

// // Define the file filter to accept only image files
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed. Please upload a valid image file.'), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// export default upload;
