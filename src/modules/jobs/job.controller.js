import { Application } from "../../../models/application.model.js";
import { Job } from "../../../models/job.model.js";
import { errorHandler } from "../../middleWares/errorHandler.js";
import { AppError } from "../../utils/appError.js";

// ~=====================================|add Job|===================================================
const addJob = errorHandler(async (req, res, next) => {
  const job = await Job.insertMany({
    ...req.body,
    addedBy: req.user.userId,
  });
  job.length && res.status(201).json({ msg: "success", job });
  job.length || next(new AppError("Job not added", 404));
});
// ~=====================================|update Job|===================================================
const updateJob = errorHandler(async (req, res, next) => {
  const job = await Job.findByIdAndUpdate(req.params.jobId, req.body, {
    new: true,
  });
  job && res.status(201).json({ msg: "success", job });
  job || next(new AppError("Job not found", 404));
});
// ~=====================================|delete Job|===================================================
const deleteJob = errorHandler(async (req, res, next) => {
  const job = await Job.findByIdAndDelete(req.params.jobId);
  if (job) {
    const applications = await Application.find({ jobID: job._id });
    for (const application of applications) {
      await Application.deleteMany({ _id: application._id });
    }
    res.status(200).json({ msg: "Job deleted", job });
  }
  job ?? next(new AppError(`Job not found`, 404));
});
// ~=====================================|Get all Jobs that match the query filters|===================================================
const getFilteredJobs = errorHandler(async (req, res, next) => {
  // Check if search query parameter is provided
  if (!req.query) {
    return next(new AppError(`filter parameters are required`, 400));
  }
  const jobs = await Job.find({ ...req.query });
  // show matched results if found
  jobs.length && res.status(200).json({ msg: "success", jobs });
  // if no jobs found
  jobs.length || next(new AppError(`no jobs found`, 404));
});
// ~=====================================|Get all Jobs with their company’s info |===================================================
const getAllJobsAndCompanies = errorHandler(async (req, res, next) => {
  // find all Jobs and populating all related jobs company info
  const jobs = await Job.find().populate({
    path: "atCompany",
    // select: "companyName",
  });
  jobs.length && res.json({ msg: "success", jobs });
  jobs.length || next(new AppError("Jobs not found", 404));
});
// ~=====================================|apply for job|===================================================
const applyForJob = errorHandler(async (req, res, next) => {
  const app = await Application.insertMany({
    ...req.body,
    userID: req.sysUser.userId,
    jobID: req.params.jobId,
  });
  app.length && res.status(201).json({ msg: "success", app });
  app.length || next(new AppError("Application not submitted", 404));
});

export {
  addJob,
  updateJob,
  deleteJob,
  getAllJobsAndCompanies,
  getFilteredJobs,
  applyForJob,
};
