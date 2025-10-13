import express from "express";
import globalErrHandler from "./middlewares/globalErrHandler";
import userRouter from "./User/userRoutes";
const app = express();

app.use(express.json());

// Routes
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello e-book readers!");
});

// Global error handler
app.use(globalErrHandler);

export default app;
