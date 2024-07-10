import { AppError } from "../utils/appError.js";

// this function is used to validate any user input against the provided joi schemas
// thru the entire app
const globalValidator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(
      { ...req.body, ...req.params, ...req.query },
      { abortEarly: false }
    );
    if (error) {
      const errMsgs = error.details.map((err) => err.message);
      next(new AppError(errMsgs, 401));
    }
    next();
  };
};
export default globalValidator;
