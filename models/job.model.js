import mongoose, { Schema, model } from "mongoose";

const jobSchema = new Schema(
  {
    jobTitle: String,
    jobLocation: {
      type: String,
      enum: ["onsite", "remotely", "hybrid"],
    },
    workingTime: {
      type: String,
      enum: ["part-time", "full-time"],
    },
    seniorityLevel: {
      type: String,
      enum: ["Junior", "Mid-Level", "Senior", "Team-Lead", "CTO"],
    },
    jobDescription: String,
    technicalSkills: {
      type: [String],
    },
    softSkills: {
      type: [String],
    },
    addedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    atCompany:{
      type: mongoose.Types.ObjectId,
      ref: "Company",
    },
  },
  {
    timestamps: { updatedAt: false },
    versionKey: false,
  }
);
export const Job = model("Job", jobSchema);
