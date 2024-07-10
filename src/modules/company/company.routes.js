import { Router } from "express";
import * as companyController from "./company.controller.js";
import { verifyToken } from "../../middleWares/verifyToken.js";
import { addCompanyVal, updateCompanyVal } from "./company.validation.js";
import globalValidator from "../../middleWares/globalValidator.js";
import { TID } from "../../middleWares/signinUserVerifyToken.js";
import { sysUserAuthMW } from "../../middleWares/sysUserAuthMW.js";

const companyRouter = Router();

//? =====================================|Get all Jobs for a specific company.|===================================================
companyRouter.get(
  "/getAllJobsForCompany",
  globalValidator(updateCompanyVal),
  sysUserAuthMW(),
  companyController.getAllJobsForCompany
);
//& =====================================|global MW|===================================================
companyRouter.use(verifyToken("", "", "", TID));
//? =====================================|add company|===================================================
companyRouter.post(
  "/addCompany",
  globalValidator(addCompanyVal),
  companyController.addCompany
);
//? =====================================|update company|===================================================
companyRouter.put(
  "/updateCompany/:companyId",
  globalValidator(updateCompanyVal),
  companyController.updateCompany
);
//? =====================================|delete company|===================================================
companyRouter.delete(
  "/deleteCompany/:companyId",
  globalValidator(updateCompanyVal),
  companyController.deleteCompany
);
//? =====================================|Get company data|===================================================
companyRouter.get(
  "/getCompanyData/:companyId",
  globalValidator(updateCompanyVal),
  companyController.getCompanyData
);
//? =====================================|search company|===================================================
companyRouter.get(
  "/searchCompany",
  globalValidator(updateCompanyVal),
  companyController.searchCompany
);

export default companyRouter;
