import { Application } from "../../../models/application.model.js";
import { errorHandler } from "../../middleWares/errorHandler.js";
import { AppError } from "../../utils/appError.js";

//~=====================================|Get App data |===================================================
const getAppData = errorHandler(async (req, res, next) => {
  const app = await Application.findById(req.params.appId);
  app && res.json({ msg: "success", app });
  app || next(new AppError("Application not found", 404));
});
// ~=====================================|update App|===================================================
const updateApp = errorHandler(async (req, res, next) => {
  // check if role is user not Company_HR
  if (req.sysUser.role == "User") {
    const app = await Application.findByIdAndUpdate(
      req.params.appId,
      req.body,
      {
        new: true,
      }
    );
    // if app is updated
    app && res.status(201).json({ msg: "success", app });
    // if app is not updated
    app || next(new AppError("Application not found", 404));
  } else {
    next(
      new AppError(
        "Only Users can apply for a job, plz create a use account and try again",
        401
      )
    );
  }
});
// ~=====================================|delete App|===================================================
const deleteApp = errorHandler(async (req, res, next) => {
  // check if role is user not Company_HR
  if (req.sysUser.role == "User") {
    const app = await Application.findByIdAndDelete(req.params.appId);
    app ?? next(new AppError(`Application not found`, 404));
    app && res.status(200).json({ msg: "Application deleted", app });
  } else {
    next(
      new AppError(
        "Only Users are authorized, plz create a use account with 'User' role and try again",
        401
      )
    );
  }
});
// ~=====================================|Get all applications for specific Job|===================================================
const getAllAppsForJob = errorHandler(async (req, res, next) => {
  const applications = await Application.find({ jobID: req.query.jobId });
  // if applications are found
  applications.length && res.status(200).json({ msg: "success", applications });
  // if no applications found
  applications.length || next(new AppError(`no applications found`, 404));
});

export { updateApp, deleteApp, getAppData, getAllAppsForJob };
