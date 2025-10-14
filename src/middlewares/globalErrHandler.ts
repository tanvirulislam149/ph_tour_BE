import { HttpError } from "http-errors";
import { Request, Response, NextFunction } from "express";
import config from "../config/config";

const globalErrHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  let message;
  if (err.name === "ValidationError") {
    const messageArray = Object.values(err.errors).map((e: any) => e.message);
    message = messageArray.join(", ");
  }

  return res.status(statusCode).json({
    message: message ? message : err.message,
    errorStack: config.ENV === "development" ? err.stack : "",
  });
};

export default globalErrHandler;
