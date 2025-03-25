import cloudinary from "../config/cloudinary.js";

const uploadImage = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "supplements" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          reject(error);
        } else {
          resolve(result); // This will contain secure_url
        }
      }
    );
    stream.end(fileBuffer); // send buffer data
  });
};

export default uploadImage;
