import { NextFunction, Request, Response } from "express";
import User from "./user.model";
import httpstatus from "http-status-codes";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(httpstatus.CREATED).json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  } catch (error: any) {
    console.log("From controller", error);
    next(error);
    // res.json(error);
  }
};

export const userController = {
  createUser,
};
