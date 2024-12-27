import { School, ISchool } from "../models/school";
import mongoose from "mongoose";
import { ROLES } from "../enums/roles";
import userService from "./userService";

class SchoolService {
  async createSchool(schoolData: Partial<ISchool>): Promise<ISchool> {
    const user = await userService.getUserById(schoolData?.superadminId || "");
    const schoolExists = await this.getSchoolByEmail(schoolData?.email || "");

    if (schoolExists) {
      throw new Error("School with this email already exists");
    }

    if (!user) {
      throw new Error("User not found with this ID");
    }

    if (user.role !== ROLES.SUPER_ADMIN) {
      throw new Error("Must provide a valid super admin ID");
    }

    const school = new School(schoolData);
    return await school.save();
  }

  async getAllSchools(): Promise<ISchool[]> {
    return await School.find();
  }

  async getSchoolsBySuperadmin(superadminId: string): Promise<ISchool[]> {
    if (!mongoose.Types.ObjectId.isValid(superadminId)) {
      throw new Error("Invalid superadmin ID");
    }
    return await School.find({ superadminId });
  }

  async getSchoolById(schoolId: string): Promise<ISchool | null> {
    if (!mongoose.Types.ObjectId.isValid(schoolId)) {
      throw new Error("Invalid school ID");
    }
    return await School.findById(schoolId);
  }

  async getSchoolByPhoneNumber(phoneNumber: string): Promise<ISchool[] | null> {
    return await School.find({ phoneNumber });
  }

  async getSchoolByEmail(email: string): Promise<ISchool | null> {
    return await School.findOne({ email });
  }

  async getSchoolsCreatedAfter(date: Date): Promise<ISchool[]> {
    return await School.find({ createdAt: { $gt: new Date(date) } });
  }

  async updateSchool(schoolId: string, updateData: Partial<ISchool>): Promise<ISchool | null> {
    if (!mongoose.Types.ObjectId.isValid(schoolId)) {
      throw new Error("Invalid school ID");
    }
    return await School.findByIdAndUpdate(schoolId, updateData, { new: true });
  }

  async deleteSchool(schoolId: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(schoolId)) {
      throw new Error("Invalid school ID");
    }
    await School.findByIdAndDelete(schoolId);
  }
}

export default new SchoolService();