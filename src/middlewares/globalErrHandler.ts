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

  return res.status(statusCode).json({
    message: err.message,
    errorStack: config.ENV === "development" ? err.stack : "",
  });
};

export default globalErrHandler;
