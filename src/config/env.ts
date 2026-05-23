import dotenv from "dotenv";

dotenv.config();

const envVars = {
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI || "mongodb://localhost:27017/myapp",
  NODE_ENV: process.env.NODE_ENV || "development",
};

export default envVars;
