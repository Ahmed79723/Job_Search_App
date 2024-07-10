import mongoose, { Schema, model } from "mongoose";

const applicationSchema = new Schema(
  {
    jobID: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
    },
    userID: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    userTechSkills: {
      type: [String],
    },
    userSoftSkills: {
      type: [String],
    },
    // userResume: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    // },
  },
  {
    timestamps: { createdAt: "submitted_at", updatedAt: false },
    versionKey: false,
  }
);
export const Application = model("Application", applicationSchema);
