import { Request, Response } from "express";
import { reportingService } from "../services/reportingService";
import helpers from "../utils/helpers";

export const getSummaryReportController = async (req: Request, res: Response): Promise<void> => {
  try {
    const report = await reportingService.getSummaryReportBySuperadminId(req.user?.id);
    res.status(200).json(report);
  } catch (error) {
    helpers.handleError(error, res);
  }
};