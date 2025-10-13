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
      validate: {
        validator: (v) => {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email.`,
      },
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
      enum: {
        values: ["Admin", "Staff", "User"],
        message: "{VALUE} is not supported",
      },
      default: "User",
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
