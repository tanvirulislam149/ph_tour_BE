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
      res.status(201).json({ accessToken: token });
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

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createHttpError(400, "Please provide email and password."));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(createHttpError(400, "User doesn't exist."));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return next(createHttpError(400, "Password didn't match."));
    }

    try {
      const token = jwt.sign(
        { user_id: user._id },
        config.JWT_TOKEN as string,
        {
          expiresIn: "7d",
        }
      );
      res.status(201).json({ accessToken: token });
    } catch (error) {
      return next(
        createHttpError(500, error || "Error while creating jwt token.")
      );
    }
  } catch (error) {
    return next(createHttpError(500, "Error while searching for user."));
  }
};

export { registerUser, loginUser };
