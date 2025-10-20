import mongoose from "mongoose";


const modelSchema = new mongoose.Schema({
  name: { type: String, required: true },        
  modelName: { type: String, required: true },   
  description: { type: String },                 
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});


export default mongoose.model("Model3D", modelSchema);
