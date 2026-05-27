import httpstatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpstatus.NOT_FOUND).json({
    success: false,
    message: "Route not found",
  });
};
