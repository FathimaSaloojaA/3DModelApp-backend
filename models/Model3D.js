import mongoose from "mongoose";

// const modelSchema = new mongoose.Schema({
//   name: String,
//   fileUrl: String,
//   uploadedAt: { type: Date, default: Date.now }
// });
const modelSchema = new mongoose.Schema({
  name: { type: String, required: true },        // e.g., "Duck"
  modelName: { type: String, required: true },   // custom name by user
  description: { type: String },                 // optional description
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});


export default mongoose.model("Model3D", modelSchema);
