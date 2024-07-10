import Joi from "joi";

const addAppVal = Joi.object({
  jobID: Joi.string().hex().length(24).required(),
  userTechSkills: Joi.array().required(),
  userSoftSkills: Joi.array().required(),
});
const updateAppVal = Joi.object({
  jobID: Joi.string().hex().length(24),
  userTechSkills: Joi.array(),
  userSoftSkills: Joi.array(),
  jobId: Joi.string().hex().length(24),
});
export { addAppVal, updateAppVal };
