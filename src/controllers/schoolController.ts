import { Request, Response } from "express";
import * as schoolService from "../services/schoolService";
import { handleError } from "../utils/helpers";

export const createSchool = async (req: Request, res: Response) => {
  try {
    const school = await schoolService.createSchool(req.body);
    res.status(201).json({ success: true, data: school });
  } catch (error) {
    handleError(error, res);
  }
};

export const getAllSchools = async (req: Request, res: Response) => {
  try {
    const schools = await schoolService.getAllSchools();
    res.status(200).json({ success: true, data: {total: schools.length, schools} });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const getSchoolsBySuperadmin = async (req: Request, res: Response) => {
  try {
    const schools = await schoolService.getSchoolsBySuperadmin(req.params.superadminId);
    res.status(200).json({ success: true, data: {total: schools.length, schools} });
  } catch (error: unknown) {
    handleError(error, res);
  }
}

export const getSchoolById = async (req: Request<{ id: string }>, res: Response): Promise<any> => {
  try {
    const school = await schoolService.getSchoolById(req.params.id);
    if (!school) {
      return res.status(404).json({ success: false, message: "School not found" });
    }
    res.status(200).json({ success: true, data: school });
  } catch (error) {
    handleError(error, res);
  }
};

export const getSchoolsByPhoneNumber = async (req: Request, res: Response): Promise<void> => {
  try {
    const school = await schoolService.getSchoolByPhoneNumber(req.params.phone);
    if (!school) {
      res.status(404).json({ message: "School not found" });
    } else {
      res.status(200).json({success: true, data: {total: school.length, school: school}});
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const getSchoolByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const school = await schoolService.getSchoolByEmail(req.params.email);
    if (!school) {
      res.status(404).json({ message: "School not found" });
    } else {
      res.status(200).json(school);
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const getSchoolsEstablishedAfter = async (req: Request, res: Response): Promise<void> => {
  try {
    const date = new Date(req.params.date);
    const schools = await schoolService.getSchoolsEstablishedAfter(date);
    res.status(200).json({success: true, data: {total: schools.length, schools: schools}});
  } catch (error) {
    handleError(error, res);
  }
};

export const updateSchool = async (req: Request, res: Response): Promise<any> => {
  try {
    const school = await schoolService.updateSchool(req.params.id, req.body);
    if (!school) {
      return res.status(404).json({ success: false, message: "School not found" });
    }
    res.status(200).json({ success: true, data: school });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteSchool = async (req: Request, res: Response) => {
  try {
    await schoolService.deleteSchool(req.params.id);
    res.status(204).send();
  } catch (error) {
    handleError(error, res);
  }
};