import { Router } from "express";
import * as JobController from "./job.controller.js";
import { verifyToken } from "../../middleWares/verifyToken.js";
import { addJobVal, applyForJobVal, updateJobVal } from "./job.validation.js";
import globalValidator from "../../middleWares/globalValidator.js";
import { TID } from "../../middleWares/signinUserVerifyToken.js";
import { sysUserAuthMW } from "../../middleWares/sysUserAuthMW.js";
import { applyForJobMW } from "../../middleWares/applyForJobMW.js";

const jobRouter = Router();

//? =====================================|Get all Jobs with their company’s info|===================================================
jobRouter.get(
  "/getAllJobsAndCompanies",
  sysUserAuthMW(),
  JobController.getAllJobsAndCompanies
);
//? =====================================|Get all Jobs that match the following filters|===================================================
jobRouter.get(
  "/getFilteredJobs",
  sysUserAuthMW(),
  globalValidator(updateJobVal),
  JobController.getFilteredJobs
);
// ?=====================================|apply For Job|===================================================
jobRouter.post(
  "/applyForJob/:jobId",
  globalValidator(applyForJobVal),
  sysUserAuthMW(),
  applyForJobMW,
  JobController.applyForJob
);
//& =====================================|global MWs|===================================================
jobRouter.use(verifyToken("", "", "", TID));
//? =====================================|add Job|===================================================
jobRouter.post("/addJob", globalValidator(addJobVal), JobController.addJob);
//? =====================================|update Job|===================================================
jobRouter.put(
  "/updateJob/:jobId",
  globalValidator(updateJobVal),
  JobController.updateJob
);
//? =====================================|delete Job|===================================================
jobRouter.delete(
  "/deleteJob/:jobId",
  globalValidator(updateJobVal),
  JobController.deleteJob
);

export default jobRouter;
