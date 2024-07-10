import Joi from "joi";

const addJobVal = Joi.object({
  jobTitle: Joi.string().min(3).max(150).required(),
  jobLocation: Joi.string().min(3).max(15).required(),
  workingTime: Joi.string().min(3).max(15).required(),
  seniorityLevel: Joi.string().min(3).max(20).required(),
  jobDescription: Joi.string().min(3).max(2500).required(),
  seniorityLevel: Joi.string().min(3).max(20).required(),
  technicalSkills: Joi.array().required(),
  softSkills: Joi.array().required(),
  atCompany: Joi.string().hex().length(24).required(),
});
const updateJobVal = Joi.object({
  jobTitle: Joi.string().min(3).max(150),
  jobLocation: Joi.string().min(3).max(15),
  workingTime: Joi.string().min(3).max(15),
  seniorityLevel: Joi.string().min(3).max(20),
  jobDescription: Joi.string().min(3).max(2500),
  seniorityLevel: Joi.string().min(3).max(20),
  technicalSkills: Joi.array(),
  softSkills: Joi.array(),
  atCompany: Joi.string().hex().length(24),
  companyName: Joi.string().min(3).max(20),
  jobId: Joi.string().hex().length(24).required(),
});
const applyForJobVal = Joi.object({
  userTechSkills: Joi.array().required(),
  userSoftSkills: Joi.array().required(),
  jobId: Joi.string().hex().length(24).required(),
});
export { addJobVal, updateJobVal, applyForJobVal };
