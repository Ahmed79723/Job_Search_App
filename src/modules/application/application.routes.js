import { Router } from "express";
import * as appController from "./application.controller.js";
import { addAppVal, updateAppVal } from "./application.validation.js";
import globalValidator from "../../middleWares/globalValidator.js";
import { sysUserAuthMW } from "../../middleWares/sysUserAuthMW.js";
import { verifyToken } from "../../middleWares/verifyToken.js";
import { TID } from "../../middleWares/signinUserVerifyToken.js";

const applicationRouter = Router();
//? =====================================|Get all applications for specific Job|===================================================
applicationRouter.get(
  "/getAllAppsForJob",
  globalValidator(updateAppVal),
  verifyToken("", "", "", TID),
  appController.getAllAppsForJob
);
//& =====================================|global MWs|===================================================
applicationRouter.use(sysUserAuthMW());
//? =====================================|update application|===================================================
applicationRouter.put(
  "/updateApp/:appId",
  globalValidator(updateAppVal),
  appController.updateApp
);
//? =====================================|delete application|===================================================
applicationRouter.delete(
  "/deleteApp/:appId",
  globalValidator(updateAppVal),
  appController.deleteApp
);
//? =====================================|Get application data|===================================================
applicationRouter.get(
  "/getAppData/:appId",
  globalValidator(updateAppVal),
  appController.getAppData
);
//? =====================================|search application|===================================================
// applicationRouter.get(
//   "/searchApplication",
//   globalValidator(updateAppVal),
//   appController.searchApplication
// );
//? =====================================|Get all applications with their company’s info|===================================================
// applicationRouter.get(
//   "/getAllApplicationsAndCompanies",
//   sysUserAuthMW(),
//   appController.getAllApplicationsAndCompanies
// );
//? =====================================|Get all applications that match the following filters|===================================================
// applicationRouter.get(
//   "/getFilteredApplications",
//   sysUserAuthMW(),
//   globalValidator(updateAppVal),
//   appController.getFilteredApplications
// );
export default applicationRouter;
