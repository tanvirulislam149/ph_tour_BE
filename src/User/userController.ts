import { Request, Response, NextFunction } from "express";
import User from "./userModel";
import createHttpError, { HttpError } from "http-errors";

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
    const result = await User.create(data);
    res.json({ result });
  } catch (error: any) {
    return next(
      createHttpError(500, error || "Error while creating new user.")
    );
  }
};

export { registerUser };
