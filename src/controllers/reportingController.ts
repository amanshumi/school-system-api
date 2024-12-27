import { Request, Response } from "express";
import { getSummaryReportBySuperadminId } from "../services/reportingService";

export const getSummaryReportController = async (req: Request, res: Response): Promise<void> => {
  try {
    const report = await getSummaryReportBySuperadminId(req.user?.id);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error fetching summary report" });
  }
};