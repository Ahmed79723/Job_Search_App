import mongoose, { Schema, model } from "mongoose";

const companySchema = new Schema(
  {
    companyName: String,
    description: String,
    industry: String,
    address: String,
    numberOfEmployees: Number,
    companyEmail: String,
    companyHR: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    Available_Jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  {
    timestamps: { updatedAt: false },
    versionKey: false,
  }
);
export const Company = model("Company", companySchema);
