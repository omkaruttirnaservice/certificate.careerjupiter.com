import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    console.log("Connecting to db...");
    const p = process.env;
    const URI = `mongodb+srv://${p.DB_USER}:${p.DB_PASS}@cluster1.xnk3z.mongodb.net/${p.DB_NAME}`;
    await mongoose.connect(URI); // Removed deprecated options
    console.log(" MongoDB Connected Successfully");
  } catch (error) {
    console.error(" MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
