import { Request, Response } from "express";
import User from "./user.model";
import httpstatus from "http-status-codes";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(httpstatus.CREATED).json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  } catch (error: any) {
    res.status(httpstatus.BAD_REQUEST).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
};

export const userController = {
  createUser,
};
