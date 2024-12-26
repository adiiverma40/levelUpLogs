import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";
import { configDotenv } from "dotenv";

configDotenv();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "Profile Pic",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

console.log("in multer");


const upload = multer({ storage: storage });

export default upload;
