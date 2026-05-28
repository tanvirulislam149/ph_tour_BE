import { NextFunction, Request, Response } from "express";
import User from "./user.model";
import httpstatus from "http-status-codes";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.createUser(req.body);

    res.status(httpstatus.CREATED).json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  },
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userService.getAllUsersService();

    res.status(httpstatus.OK).json({
      success: true,
      message: "Users retrieved successfully",
      users: users,
    });
  },
);

export const userController = {
  createUser,
  getAllUsers,
};
