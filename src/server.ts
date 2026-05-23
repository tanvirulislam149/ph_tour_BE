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

process.on("unhandledRejection", (reason, promise) => {
  // promise rejections that are not handled anywhere in the code will trigger this event
  console.error("unhandled Rejection at:", promise, "reason:", reason);

  process.exit(1);
});

process.on("uncaughtException", (error) => {
  // uncaught exceptions that are not handled anywhere in the code will trigger this event
  console.error("uncaught Exception:", error);

  process.exit(1);
});

process.on("SIGTERM", () => {
  // SIGTERM is a signal sent to the process to request termination. It can be used to gracefully shut down the server when it receives this signal.
  console.log("SIGTERM received, shutting down gracefully");

  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});

// Promise.reject(new Error('Promise failed'))
// throw new Error('Uncaught exception')
