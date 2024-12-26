import { School, ISchool } from "../models/school";
import mongoose from "mongoose";

export const createSchool = async (schoolData: Partial<ISchool>): Promise<ISchool> => {
  const school = new School(schoolData);
  return await school.save();
};

export const getAllSchools = async (): Promise<ISchool[]> => {
  return await School.find();
};

export const getSchoolById = async (schoolId: string): Promise<ISchool | null> => {
  if (!mongoose.Types.ObjectId.isValid(schoolId)) {
    throw new Error("Invalid school ID");
  }
  return await School.findById(schoolId);
};

export const updateSchool = async (schoolId: string, updateData: Partial<ISchool>): Promise<ISchool | null> => {
  if (!mongoose.Types.ObjectId.isValid(schoolId)) {
    throw new Error("Invalid school ID");
  }
  return await School.findByIdAndUpdate(schoolId, updateData, { new: true });
};

export const deleteSchool = async (schoolId: string): Promise<void> => {
  if (!mongoose.Types.ObjectId.isValid(schoolId)) {
    throw new Error("Invalid school ID");
  }
  await School.findByIdAndDelete(schoolId);
};