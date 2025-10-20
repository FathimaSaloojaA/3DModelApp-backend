import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinaryConfig.js"; // your cloudinary config
import { uploadModel, getAllModels, deleteModel, viewModel } from "../controllers/modelController.js";

const router = express.Router();

// --- Configure Cloudinary Storage ---
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "salooja-products", // folder name in Cloudinary
    resource_type: "raw", // this allows .glb or other 3D model types
     // optional, you can allow multiple formats
  },
});

const upload = multer({ storage });

// --- Routes ---
router.post("/upload", upload.single("model"), uploadModel);
router.get("/", getAllModels);
router.get("/:id", viewModel);
router.delete("/:id", deleteModel);

export default router;
