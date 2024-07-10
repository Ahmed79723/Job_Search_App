import { Application } from "../../../models/application.model.js";
import { Company } from "../../../models/company.model.js";
import { Job } from "../../../models/job.model.js";
import { errorHandler } from "../../middleWares/errorHandler.js";
import { AppError } from "../../utils/appError.js";

// ~=====================================|Get company data |===================================================
const getCompanyData = errorHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.companyId).populate({
    path: "Available_Jobs",
  });
  // if company data found
  company && res.json({ msg: "success", company });
  // if company data not found
  company || next(new AppError("company not found", 404));
});
// ~=====================================|add Company|===================================================
const addCompany = errorHandler(async (req, res, next) => {
  const company = await Company.insertMany({
    ...req.body,
    companyHR: req.user.userId,
  });
  // if company is added
  company.length && res.status(201).json({ msg: "success", company });
  // if company not added
  company.length || next(new AppError("company not added", 404));
});
// ~=====================================|update Company|===================================================
const updateCompany = errorHandler(async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(
    req.params.companyId,
    req.body,
    {
      new: true,
    }
  );
  company && res.status(201).json({ msg: "success", company });
  company || next(new AppError("company not found", 404));
});
// ~=====================================|delete Company|===================================================
const deleteCompany = errorHandler(async (req, res, next) => {
  const company = await Company.findByIdAndDelete(req.params.companyId);
  if (company) {
    // finding all related company jobs
    const jobs = await Job.find({ atCompany: company._id });
    for (const job of jobs) {
      // deleting all related job Applications
      await Application.deleteMany({ jobID: job._id });
    }
    // delete all related company jobs
    await Job.deleteMany({ atCompany: company._id });
    res.status(200).json({ msg: "Company deleted", company });
  }
  company ?? next(new AppError(`Company not found`, 404));
});
// ~=====================================|search Company|===================================================
const searchCompany = errorHandler(async (req, res, next) => {
  const { companyName } = req.query;
  // Check if search query parameter is provided
  if (!companyName) {
    return next(new AppError(`search query parameter is required`, 400));
  }
  const companies = await Company.find({ ...req.query });
  // show matched results if found
  companies.length && res.status(200).json({ msg: "success", companies });
  // if no companies found
  companies.length || next(new AppError(`no companies found`, 404));
});
// ~=====================================|Get all Jobs for a specific company.|===================================================
const getAllJobsForCompany = errorHandler(async (req, res, next) => {
  // find companies using req.query params and populating all related company jobs
  // with deep population for the job poster HR
  const jobs = await Company.find({ ...req.query }).populate({
    path: "Available_Jobs",
    populate: { path: "addedBy", select: "username-_id" },
  });
  jobs.length && res.json({ msg: "success", jobs: jobs[0].Available_Jobs });
  jobs.length || next(new AppError("Jobs not found", 404));
});
export {
  getCompanyData,
  addCompany,
  updateCompany,
  deleteCompany,
  searchCompany,
  getAllJobsForCompany,
};
