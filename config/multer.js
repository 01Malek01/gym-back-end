// multerConfig.js
import multer from "multer";
import AppError from "../utils/AppError.js";
const storage = multer.memoryStorage(); // Store files in memory. preferred for cloudinary
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new AppError("Please upload an image", 400), false);
    }
    // Accept the file if the mimetype starts with 'image/'
    cb(null, true);
  },
});

export default upload;
