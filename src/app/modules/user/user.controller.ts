import { Request, Response } from "express";
import User from "./user.model";
import httpstatus from "http-status-codes";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });

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
