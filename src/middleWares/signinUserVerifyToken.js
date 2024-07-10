import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";
import { AppError } from "../utils/appError.js";
import { sendEmails } from "../email/email.js";
import { verifyToken } from "./verifyToken.js";

let signinToken;
let TID;
const signinUserVerify = errorHandler(async (req, res, next) => {
  const loginEmailUser = await User.findOne({
    email: req.body.email,
  });
  const loginPhoneUser = await User.findOne({
    mobileNumber: req.body.mobileNumber,
  });
  const user = loginEmailUser ?? loginPhoneUser;
  //& =====================================|check email confirmation status|===================================================
  if (!user?.confirmEmail) {
    const randomOtp = Math.floor(100000 + Math.random() * 900000);
    sendEmails(user?.email, user?.username, randomOtp);
  }

  if (
    (!loginEmailUser && !loginPhoneUser) ||
    !bcrypt.compareSync(req.body.password, user.password)
  ) {
    return next(new AppError(`Wrong login info`, 401));
  }
  await User.updateOne({ email: user.email }, { status: "online" });
  jwt.sign(
    {
      userId: user._id,
      name: user.username,
      role: user.role,
    },
    "signInToken",
    (err, token) => {
      if (err) next(new AppError(err, 500));
      req.body._id = user._id;
      req.body.username = user.username;
      signinToken = "signInToken " + token;
      req.body.token = signinToken;
      TID = user._id;
      // verifyToken("", "", "", signinToken);
      // verifyToken("", "", "", TID);
      next();
    }
  );
});

export { signinUserVerify, signinToken, TID };
