import { School, ISchool } from "../models/school";
import mongoose from "mongoose";
import { getUserById } from "./userService";
import { ROLES } from "../enums/roles";

export const createSchool = async (schoolData: Partial<ISchool>): Promise<ISchool> => {
  const user = await getUserById(schoolData?.superadminId || '');
  const schoolExists = await getSchoolByEmail(schoolData?.email || '');

  if(schoolExists) {
    throw new Error('School with this email already exists');
  }

  if(!user) {
    throw new Error('User not found with this id')
  }

  if(user.role !== ROLES.SUPER_ADMIN) {
    throw new Error('Must provide a valid super admin id');
  }

  const school = new School(schoolData);
  return await school.save();
};

export const getAllSchools = async (): Promise<ISchool[]> => {
  return await School.find();
};

export const getSchoolsBySuperadmin = async (superadminId: string): Promise<ISchool[]> => {
  if (!mongoose.Types.ObjectId.isValid(superadminId)) {
    throw new Error("Invalid superadmin ID");
  }
  return await School.find({ superadminId });
};

export const getSchoolById = async (schoolId: string): Promise<ISchool | null> => {
  if (!mongoose.Types.ObjectId.isValid(schoolId)) {
    throw new Error("Invalid school ID");
  }
  return await School.findById(schoolId);
};

export const getSchoolByPhoneNumber = async (phoneNumber: string): Promise<ISchool[] | null> => {
  try {
    return await School.find({ phoneNumber });
  } catch (error) {
    throw new Error(`Error fetching school by phone number`);
  }
};

export const getSchoolByEmail = async (email: string): Promise<ISchool | null> => {
  try {
    return await School.findOne({ email });
  } catch (error) {
    throw new Error(`Error fetching school by email`);
  }
};

export const getSchoolsEstablishedAfter = async (date: Date): Promise<ISchool[]> => {
  try {
    return await School.find({ establishedDate: { $gt: date } });
  } catch (error) {
    throw new Error(`Error fetching schools established after date`);
  }
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