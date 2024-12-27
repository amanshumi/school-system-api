import { Router } from "express";
import { getSummaryReportController } from "../controllers/reportingController";
import authMiddleware from "../middlewares/authMiddleware";
import { ROLES } from "../enums/roles";


class ReportingRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/summary", authMiddleware.authorize([ROLES.SUPER_ADMIN]), getSummaryReportController);
    }
    getRouter() {
        return this.router;
    }
}

export default new ReportingRoutes().getRouter();