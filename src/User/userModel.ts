import mongoose, { Schema } from "mongoose";
import IUser from "./userInterface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "User's name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      select: false,
    },
    phone: Number,
    address: String,
    role: {
      type: String,
      required: [true, "User's role is required"],
      enum: ["Admin", "Staff", "User"],
      default: "User",
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
