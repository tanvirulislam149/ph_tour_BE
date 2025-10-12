import mongoose from "mongoose";
import config from "./config";

const db_connect = async () => {
  try {
    await mongoose.connect(config.db_url as string);
    console.log("db connect successful");
  } catch (error) {
    console.error("db connection error", error);
    process.exit(1);
  }
};

export default db_connect;
