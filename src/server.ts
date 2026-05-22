import mongoose from "mongoose";
import app from "./app";

const startServer = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ph_tour");

    console.log("Connected to MongoDB");

    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

startServer();
