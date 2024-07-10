import { Job } from "../../models/job.model.js";
import { AppError } from "../utils/appError.js";
import { errorHandler } from "./errorHandler.js";

export const applyForJobMW = errorHandler(async (req, res, next) => {
  // this middle ware is used to make sure only accounts with roles in ["User"]
  // are the only ones who can access the apply for a job end point
  if (req.sysUser.role == "User") {
    // find the desired job by using params jobId
    const job = await Job.findById(req.params.jobId);
    job && next();
    job || next(new AppError(`no job found for this id`, 404));
  } else {
    return next(
      new AppError(
        "only Users can apply for a jobs,plz create an user account and try again",
        401
      )
    );
  }
});
