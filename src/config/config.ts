import "dotenv/config";

const config = {
  PORT: process.env.PORT || 3000,
  db_url: process.env.DB_URL,
  ENV: process.env.ENV,
  JWT_TOKEN: process.env.JWT_TOKEN,
};

export default config;
