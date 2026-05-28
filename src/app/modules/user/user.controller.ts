import { NextFunction, Request, Response } from "express";
import User from "./user.model";
import httpstatus from "http-status-codes";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.createUser(req.body);

    sendResponse(res, {
      statusCode: httpstatus.CREATED,
      success: true,
      message: "User created successfully",
      data: user,
    });
  },
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userService.getAllUsersService();

    sendResponse(res, {
      statusCode: httpstatus.OK,
      success: true,
      message: "Users retrieved successfully",
      data: users.data,
      meta: users.meta,
    });
  },
);

export const userController = {
  createUser,
  getAllUsers,
};
