import Joi from "joi";

const addCompanyVal = Joi.object({
  companyName: Joi.string().min(3).max(150).required(),
  description: Joi.string().min(3).max(3000).required(),
  industry: Joi.string().min(3).max(150).required(),
  address: Joi.string().min(3).max(1500).required(),
  numberOfEmployees: Joi.number().min(11).max(3000).required(),
  companyEmail: Joi.string().email().required(),
  companyHR: Joi.string().hex().length(24),
  Available_Jobs: Joi.array().required(),
});
const updateCompanyVal = Joi.object({
  companyName: Joi.string().min(3).max(150),
  description: Joi.string().min(3).max(3000),
  industry: Joi.string().min(3).max(150),
  address: Joi.string().min(3).max(1500),
  numberOfEmployees: Joi.number().min(11).max(3000),
  companyEmail: Joi.string().email(),
  companyId: Joi.string().hex().length(24),
  Available_Jobs: Joi.array(),
});
export { addCompanyVal, updateCompanyVal };
