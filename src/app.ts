import express, { Request, Response } from "express";
import { userRouter } from "./app/modules/user/user.route";
import cors from "cors";
import { router } from "./app/routes";
import { globarlErrorHandler } from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to PH_tour API" });
});

app.use(globarlErrorHandler);

app.use(notFound);

export default app;
