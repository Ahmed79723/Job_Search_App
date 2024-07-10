import Joi from "joi";
const sigUpValSchema = Joi.object({
  firstName: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().min(3).max(20).required(),
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[A-Z][A-Za-z0-9]{8,40}$/)
    .required(),
  role: Joi.string().min(3).max(20).required(),
  recoveryEmail: Joi.string().email().required(),
  DOB: Joi.string().required(),
  mobileNumber: Joi.string()
    .pattern(/^(002|\+2)?01[0125][0-9]{8}$/)
    .required(),
  rePassword: Joi.valid(Joi.ref("password")).required(),
  // works_At: Joi.string().hex().length(24).required(),
  works_At: Joi.string().custom((value, helpers) => {
    if (value === "" || /^[0-9a-fA-F]{24}$/.test(value)) {
      return value;
    }
    return helpers.message(
      "worksAt must be an empty string or a 24-character hexadecimal string"
    );
  }),
});
const sigInValSchema = Joi.object({
  email: Joi.string().email(),
  mobileNumber: Joi.string().pattern(/^(002|\+2)?01[0125][0-9]{8}$/),
  password: Joi.string()
    .pattern(/^[A-Z][A-Za-z0-9]{8,40}$/)
    .required(),
});
const updateValSchema = Joi.object({
  firstName: Joi.string().min(3).max(20),
  lastName: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  recoveryEmail: Joi.string().email(),
  role: Joi.string().min(3).max(20),
  DOB: Joi.string(),
  mobileNumber: Joi.string().pattern(/^(002|\+2)?01[0125][0-9]{8}$/),
  works_At: Joi.string().custom((value, helpers) => {
    if (value === "" || /^[0-9a-fA-F]{24}$/.test(value)) {
      return value;
    }
    return helpers.message(
      "worksAt must be an empty string or a 24-character hexadecimal string"
    );
  }),
  id: Joi.string().hex().length(24).required(),
});
const updatePassValSchema = Joi.object({
  password: Joi.string()
    .pattern(/^[A-Z][A-Za-z0-9]{8,40}$/)
    .required(),
  rePassword: Joi.valid(Joi.ref("password")).required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().pattern(/^(002|\+2)?01[0125][0-9]{8}$/),
  id: Joi.string().hex().length(24).required(),
});
const forgetPassValSchema = Joi.object({
  newPassword: Joi.string()
    .pattern(/^[A-Z][A-Za-z0-9]{8,40}$/)
    .required(),
  rePassword: Joi.valid(Joi.ref("newPassword")).required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().pattern(/^(002|\+2)?01[0125][0-9]{8}$/),
  id: Joi.string().hex().length(24).required(),
});
const userRecoveryEmailValSchema = Joi.object({
  recoveryEmail: Joi.string().email().required(),
});
export {
  sigUpValSchema,
  sigInValSchema,
  updateValSchema,
  updatePassValSchema,
  forgetPassValSchema,
  userRecoveryEmailValSchema,
};
