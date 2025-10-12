import express from "express";
import globalErrHandler from "./middlewares/globalErrHandler";
const app = express();

app.use(express.json());

// Routes

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Global error handler
app.use(globalErrHandler);

export default app;
