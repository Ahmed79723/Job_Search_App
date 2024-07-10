import { User } from "../../models/user.model.js";
import { sendEmails } from "../email/email.js";
import { AppError } from "../utils/appError.js";
import { errorHandler } from "./errorHandler.js";

// this middleware enables user to restore his forgotten pass by
// his email or phone
export const ForgetPassMW = errorHandler(async (req, res, next) => {
  // declaring a user input to dynamically store the provided data from user
  let userInput;
  if (req.body.email) {
    userInput = { email: req.body.email };
  } else if (req.body.mobileNumber) {
    userInput = { mobileNumber: req.body.mobileNumber };
  } else {
    next(
      new AppError(
        "plz enter your mobile Number or email to recover password",
        501
      )
    );
  }
  // generate a new otp and new expire time to send it into the user document
  const randomOtp = Math.floor(100000 + Math.random() * 900000);
  const user = await User.findOneAndUpdate(
    userInput,
    { otp: randomOtp, otpExpire: Date.now() + 60000 },
    {
      new: true,
    }
  );
  if (!user) {
    return next(
      new AppError("User Not found, plz check your input and try again", 404)
    );
  }
  // storing the updated user in a constant obj
  // check if the encoded userId from token is the same to the updated user id or not 
  // to make sure we update the password for the right user
  if (req.sysUser.userId == user._id) {
    const extra = { newPassword: req.body.newPassword, userF: user };
    // storing the updated user ,userName and otp to the sendEmails function to send it to emailTemplate
    // function to be later able to request the verification end points with these arguments
    sendEmails(user.email, user.username, randomOtp, extra);
    return res.status(200).json({
      msg: "Please check your email to verify your identity and complete steps to restore your password",
    });
  } else {
    return next(new AppError("You are not authorized to do this action", 401));
  }
});
