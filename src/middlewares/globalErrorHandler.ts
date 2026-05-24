import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import envVars from "../config/env";

export const globarlErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
  const statusCode = 500;
  const message =
    `Something went wrong!!! ${err.message}` || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    err,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
