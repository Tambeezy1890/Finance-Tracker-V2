import mongoose from "mongoose";
import { DB_URI } from "./env.js";

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(DB_URI);

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // kill app if DB fails
  }
};

export default connectDatabase;
