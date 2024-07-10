import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: String,
    recoveryEmail: String,
    DOB: {
      type: String, // Store date as a string
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/, // Validate the format YYYY-MM-DD
    },
    mobileNumber: String,
    password: String,
    role: {
      type: String,
      enum: ["User", "Company_HR"],
      default: "User",
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    works_At: {
      type: String,
      default: "",
      ref: "Company",
    },
    otp: String,
    otpExpire: Date,
  },
  {
    timestamps: { updatedAt: false },
    versionKey: false,
  }
);
export const User = model("User", userSchema);
