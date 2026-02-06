import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
  const uri = (
    process.env.MONGO_URI ||
    "mongodb+srv://shivam68338_db_user:Events2712@cluster0.umpyazd.mongodb.net/"
  ).trim();
  if (!uri) {
    throw new Error("MONGO_URI is missing. Check backend/.env");
  }
  await mongoose.connect(uri);
  console.log("MongoDB connected");
};
