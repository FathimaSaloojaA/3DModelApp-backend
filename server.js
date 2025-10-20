import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import modelRoutes from "./routes/modelRoutes.js";

dotenv.config();
const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));



app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/models", modelRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("DB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
