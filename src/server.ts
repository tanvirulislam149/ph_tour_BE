import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URI as string);

    console.log("Connected to MongoDB");

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running on port " + (process.env.PORT || 5000));
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

startServer();
