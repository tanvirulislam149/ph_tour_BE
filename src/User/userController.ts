import { Request, Response, NextFunction } from "express";

const registerUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

export { registerUser };
