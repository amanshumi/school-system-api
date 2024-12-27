import { Router } from "express";
import { getSummaryReportController } from "../controllers/reportingController";
import authMiddleware from "../middlewares/authMiddleware";
import { ROLES } from "../enums/roles";

const reportingRouter = Router();

reportingRouter.get("/summary", authMiddleware.authorize([ROLES.SUPER_ADMIN]), getSummaryReportController);

export default reportingRouter;