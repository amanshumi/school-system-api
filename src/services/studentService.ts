import { Student } from "../models/student";
import { IStudent } from "../models/student";
import mongoose from "mongoose";
import { getClassRoomById } from "./classRoomService";
import { getSchoolById } from "./schoolService";

export const enrollStudent = async (studentData: Partial<IStudent>): Promise<IStudent> => {
  const classRoom = await getClassRoomById(studentData.classroomId || '');
  const school = await getSchoolById(studentData?.schoolId || '');
  const studentCheck = await Student.findOne({ studentId: studentData.studentId });

  if (studentCheck) {
    throw new Error("Student already exists with the same student ID");
  }

  if (!classRoom || !school) {
    throw new Error("Classroom or school not found");
  }

  const student = new Student(studentData);
  return await student.save();
};

export const transferStudent = async (studentId: string, newClassroomId: string): Promise<IStudent | null> => {
  console.log("ID: ", studentId, newClassroomId);
  if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(newClassroomId)) {
    throw new Error("Invalid ID(s)");
  }
  return await Student.findByIdAndUpdate(studentId, { classroomId: newClassroomId }, { new: true });
};

export const getStudentsByClassroom = async (classroomId: string): Promise<IStudent[]> => {
  if (!mongoose.Types.ObjectId.isValid(classroomId)) {
    throw new Error("Invalid classroom ID");
  }
  return await Student.find({ classroomId });
};

export const getStudentById = async (studentId: string): Promise<IStudent | null> => {
  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    throw new Error("Invalid student ID");
  }
  return await Student.findById(studentId);
};

export const getStudentsBySchool = async (schoolId: string): Promise<IStudent[]> => {
  if (!mongoose.Types.ObjectId.isValid(schoolId)) {
    throw new Error("Invalid school ID");
  }
  return await Student.find({ schoolId });
};

export const updateStudent = async (studentId: string, updateData: Partial<IStudent>): Promise<IStudent | null> => {
  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    throw new Error("Invalid student ID");
  }
  return await Student.findByIdAndUpdate(studentId, updateData, { new: true });
};

export const deleteStudent = async (studentId: string): Promise<void> => {
  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    throw new Error("Invalid student ID");
  }
  await Student.findByIdAndDelete(studentId);
};