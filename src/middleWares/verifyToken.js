import jwt from "jsonwebtoken";
import { User } from "../../models/user.model.js";
import { AppError } from "../utils/appError.js";
import { errorHandler } from "./errorHandler.js";
import { signinToken } from "./signinUserVerifyToken.js";

// this middle ware is used to make sure only accounts with roles in ["User","Company_Hr"]
// are the only ones who can access the system end points
// but with extra limitations to allow only HRs to execute certain tasks like adding companies or jobs
//  as follows a User must have it's user id in params to proceed
// a Company_HR mustn't have it is id in params to proceed
export const verifyToken = (req, res, next, T_ID) => {
  return errorHandler(async (req, res, next) => {
    // check end point headers for token existence
    req.headers.token ?? next(new AppError("No token, plz Log In again", 404));
    // extract the token bearer and core after validating token existence
    const [bearer, token] = req.headers.token?.split(" ");
    //? Token bearer check
    if (bearer == "signInToken") {
      // verify headers signInToken
      jwt.verify(token, "signInToken", async (err, decoded) => {
        if (err) return next(new AppError(err, 404));
        // storing token decoded data in req to send it to controllers for later use
        req.user = decoded;
        // declaring an input variable to use it later in finding the encoded user in token
        let input;
        // User must have it's user id in params to proceed
        if (req.params.id && req.user.role == "User") {
          input = { _id: req.params.id };
        }
        // a Company_HR mustn't have it is id in params to proceed
        else if (req.user.role == "Company_HR" && !req.params.id) {
          input = { username: req.user.name };
        } else if (!req.user.name) {
          return next(new AppError("no user found for this token", 404));
        } else {
          return next(new AppError("User Not Authorized", 401));
        }
        // use decoded data to find a user and check his status
        const match = await User.findOne({ ...input });
        if (match?.status == "offline")
          return next(
            new AppError(
              "User Not online! , plz login first and try again",
              401
            )
          );
        // use decoded data to find a user and check his id against decoded userId from token
        // to avoid token manipulation
        if (match?._id == decoded.userId) return next();
        next(new AppError("User Not Authorized", 401));
      });
    } else {
      next(new AppError("wrong token bearer", 409));
    }
  });
};
