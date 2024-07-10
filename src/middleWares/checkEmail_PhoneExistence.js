import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";
import { AppError } from "../utils/appError.js";

// this Middleware is used to make sure user email and phone are unique
//and generate token upon user signup and 
// using this token to encode certain user data later
const checkEmail_PhoneExistence = async (req, res, next) => {
  const email = await User.findOne({
    email: req.body.email,
  });
  const mobileNumber = await User.findOne({
    mobileNumber: req.body.mobileNumber,
  });
  if (email) {
    return next(new AppError(`email already exists`, 409));
  } else if (mobileNumber) {
    return next(new AppError(`mobileNumber already exists`, 409));
  }
  // if email and phone are both unique then encrypt user password
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  next();
};

export default checkEmail_PhoneExistence;
