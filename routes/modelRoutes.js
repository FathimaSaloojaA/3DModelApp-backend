import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinaryConfig.js"; 
import { uploadModel, getAllModels, deleteModel, viewModel } from "../controllers/modelController.js";

const router = express.Router();

// --- Configure Cloudinary Storage ---
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "salooja-products", 
    resource_type: "raw", 
  },
});

const upload = multer({ storage });


router.post("/upload", upload.single("model"), uploadModel);
router.get("/", getAllModels);
router.get("/:id", viewModel);
router.delete("/:id", deleteModel);

export default router;
