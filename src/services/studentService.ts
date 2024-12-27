import { Student } from "../models/student";
import { IStudent } from "../models/student";
import mongoose from "mongoose";
import classRoomService from "./classRoomService";
import schoolService from "./schoolService";

class StudentService {
  async enrollStudent(studentData: Partial<IStudent>): Promise<IStudent> {
    const classRoom = await classRoomService.getClassRoomById(studentData.classroomId || "");
    const school = await schoolService.getSchoolById(studentData.schoolId || "");
    const studentCheck = await Student.findOne({ studentId: studentData.studentId });

    if (studentCheck) {
      throw new Error("Student already exists with the same student ID");
    }

    if (!classRoom || !school) {
      throw new Error("Classroom or school not found");
    }

    const student = new Student(studentData);
    return await student.save();
  }

  async transferStudent(studentId: string, newClassroomId: string): Promise<IStudent | null> {
    if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(newClassroomId)) {
      throw new Error("Invalid ID(s)");
    }
    return await Student.findByIdAndUpdate(studentId, { classroomId: newClassroomId }, { new: true });
  }

  async getStudentsByClassroom(classroomId: string): Promise<IStudent[]> {
    if (!mongoose.Types.ObjectId.isValid(classroomId)) {
      throw new Error("Invalid classroom ID");
    }
    return await Student.find({ classroomId });
  }

  async getStudentById(studentId: string): Promise<IStudent | null> {
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      throw new Error("Invalid student ID");
    }
    return await Student.findById(studentId);
  }

  async getStudentsBySchool(schoolId: string): Promise<IStudent[]> {
    if (!mongoose.Types.ObjectId.isValid(schoolId)) {
      throw new Error("Invalid school ID");
    }
    return await Student.find({ schoolId });
  }

  async updateStudent(studentId: string, updateData: Partial<IStudent>): Promise<IStudent | null> {
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      throw new Error("Invalid student ID");
    }
    return await Student.findByIdAndUpdate(studentId, updateData, { new: true });
  }

  async deleteStudent(studentId: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      throw new Error("Invalid student ID");
    }
    await Student.findByIdAndDelete(studentId);
  }
}

export default new StudentService();