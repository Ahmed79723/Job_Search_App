import { Router } from "express";
import * as userController from "./user.controller.js";
import {
  signinUserVerify,
  TID,
} from "../../middleWares/signinUserVerifyToken.js";
import * as userValSchemas from "./userValidation.js";
import globalValidator from "../../middleWares/globalValidator.js";
import checkEmail_PhoneExistence from "../../middleWares/checkEmail_PhoneExistence.js";
import { verifyToken } from "../../middleWares/verifyToken.js";
import { ForgetPassMW } from "../../middleWares/forgetPassMW.js";
import { sysUserAuthMW } from "../../middleWares/sysUserAuthMW.js";

const userRouter = Router();
// ?=====================================|signup|===================================================
userRouter.post(
  "/auth/signup",
  globalValidator(userValSchemas.sigUpValSchema),
  checkEmail_PhoneExistence,
  userController.signup
);
// ?=====================================|signin|===================================================
userRouter.post(
  "/auth/signin",
  globalValidator(userValSchemas.sigInValSchema),
  signinUserVerify,
  userController.signin
);
// &=====================================|global MW|===================================================
userRouter.use(sysUserAuthMW());
// ?=====================================|get User data|===================================================
userRouter.get(
  "/getData/:id",
  globalValidator(userValSchemas.updateValSchema),
  userController.getUserData
);
// ?=====================================|get Users info|===================================================
userRouter.get(
  "/getUsersInfo/:id",
  globalValidator(userValSchemas.updateValSchema),
  userController.getUsersInfo
);
// ?=====================================|get Users By Recovery Email|===================================================
userRouter.get(
  "/getUsersByRecoveryEmail",
  globalValidator(userValSchemas.userRecoveryEmailValSchema),
  userController.getUsersByRecoveryMail
);
// ?=====================================|user Forget Pass|===================================================
userRouter.post(
  "/forgetPass/:id",
  globalValidator(userValSchemas.forgetPassValSchema),
  ForgetPassMW
);
// ?=====================================|update User|===================================================
userRouter.put(
  "/update/:id",
  globalValidator(userValSchemas.updateValSchema),
  userController.updateUser
);
// ?=====================================|update User Pass|===================================================
userRouter.put(
  "/updatePass/:id",
  globalValidator(userValSchemas.updatePassValSchema),
  userController.updateUserPass
);
// ?=====================================|delete User|===================================================
userRouter.delete(
  "/delete/:id",
  globalValidator(userValSchemas.updateValSchema),
  userController.deleteUser
);

export default userRouter;
