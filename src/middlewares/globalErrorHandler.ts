import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import envVars from "../config/env";
import { AppError } from "../app/errorHelper/errorHelper";

export const globarlErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = err.message || "Internal Server Error";

  if (err instanceof AppError) {
    err.statusCode = err.statusCode || statusCode;
  }

  res.status(statusCode).json({
    success: false,
    message,
    err,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
