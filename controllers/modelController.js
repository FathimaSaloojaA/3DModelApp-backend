import Model3D from "../models/Model3D.js";
import cloudinary from "../cloudinaryConfig.js";
import fs from "fs";


// export const uploadModel = async (req, res) => 
//   try {
//     const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
//     const newModel = await Model3D.create({
//       name: req.file.originalname,
//       fileUrl
//     });
//     res.status(201).json(newModel);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Upload failed" });
//   }
// };
// export const uploadModel = async (req, res) => {
//   try {
//     const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
//     const { name, modelName, description } = req.body;

//     const newModel = await Model3D.create({
//       name,
//       modelName,
//       description,
//       fileUrl,
//     });

//     res.status(201).json(newModel);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Upload failed" });
//   }
// };
export const uploadModel = async (req, res) => {
  try {
    const { name, modelName, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
  resource_type: "auto",
  folder: "salooja-products",
});

    // Delete local temp file
   
    // Save metadata in MongoDB
    const newModel = await Model3D.create({
      name,
      modelName,
      description,
      fileUrl: result.secure_url,
      publicId: result.public_id,
    });

    res.status(201).json({
      message: "File uploaded & metadata saved successfully!",
      newModel,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
};
export const getAllModels = async (req, res) => {
  try {
    const models = await Model3D.find().sort({ uploadedAt: -1 });
    res.json(models);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch models" });
  }
};

export const deleteModel = async (req, res) => {
  try {
    const id = req.params.id;
    await Model3D.findByIdAndDelete(id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
};

export const viewModel = async (req, res) => {
  try {
    const model = await Model3D.findById(req.params.id); // ✅ use Model3D
    if (!model) return res.status(404).json({ message: "Model not found" });
    res.json(model);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


