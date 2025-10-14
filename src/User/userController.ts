import { Request, Response, NextFunction } from "express";
import User from "./userModel";
import createHttpError, { HttpError } from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  try {
    const { email } = data;
    const exist = await User.findOne({ email: email });
    if (exist) {
      return next(createHttpError(400, "User already exists"));
    }
  } catch (error: any) {
    return next(createHttpError(500, error || "Error while getting user."));
  }

  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const finalData = {
      ...data,
      password: hashedPassword,
    };
    const result = await User.create(finalData);

    try {
      const token = jwt.sign(
        { user_id: result._id },
        config.JWT_TOKEN as string,
        {
          expiresIn: "7d",
        }
      );
      res.json({ accessToken: token });
    } catch (error) {
      return next(
        createHttpError(500, error || "Error while creating jwt token.")
      );
    }
  } catch (error: any) {
    return next(
      createHttpError(500, error || "Error while creating new user.")
    );
  }
};

export { registerUser };
