import express from "express";
const userRouter = express.Router();

userRouter.get("/register", (req, res, next) => {
  res.json({ msg: "hello routes" });
});

export default userRouter;
