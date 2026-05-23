import { IUser } from "./user.interface";
import User from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  if (!payload.name || !payload.email) {
    throw new Error("name and email are required");
  }

  const user = await User.create(payload);

  return user;
};

export const userService = {
  createUser,
};
