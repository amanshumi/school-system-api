import { Request, Response } from "express";
import * as schoolService from "../services/schoolService";
import { ISchool } from "../models/school";

export const createSchool = async (req: Request, res: Response) => {
  try {
    const school = await schoolService.createSchool(req.body);
    res.status(201).json({ success: true, data: school });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'An unknown error occurred' });
    }
  }
};

export const getAllSchools = async (req: Request, res: Response) => {
  try {
    const schools = await schoolService.getAllSchools();
    res.status(200).json({ success: true, data: schools });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'An unknown error occurred' });
    }
  }
};

export const getSchoolById = async (req: Request<{ id: string }>, res: Response): Promise<any> => {
  try {
    const school = await schoolService.getSchoolById(req.params.id);
    if (!school) {
      return res.status(404).json({ success: false, message: "School not found" });
    }
    res.status(200).json({ success: true, data: school });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'An unknown error occurred' });
    }
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
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'An unknown error occurred' });
    }
  }
};

export const deleteSchool = async (req: Request, res: Response) => {
  try {
    await schoolService.deleteSchool(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'An unknown error occurred' });
    }
  }
};