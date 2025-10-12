import app from "./app";
import config from "./config/config";
import db_connect from "./config/db_connect";

const server = async () => {
  await db_connect();

  app.listen(config.PORT, () => {
    console.log(`Example app listening on port ${config.PORT}`);
  });
};

server();
