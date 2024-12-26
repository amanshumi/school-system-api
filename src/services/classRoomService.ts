import mongoose from "mongoose";
import { ClassRoom } from "../models/classRoom";
import { IClassRoom } from "../models/classRoom";

export const createClassRoom = async (ClassRoomData: Partial<IClassRoom>): Promise<IClassRoom> => {
  const classRoom = new ClassRoom(ClassRoomData);
  return await classRoom.save();
};

export const getAllClassrooms = async (): Promise<IClassRoom[]> => {
    return await ClassRoom.find();
}

export const getClassRoomsBySchool = async (schoolId: string): Promise<IClassRoom[]> => {
  if (!mongoose.Types.ObjectId.isValid(schoolId)) {
    throw new Error("Invalid school ID");
  }
  return await ClassRoom.find({ schoolId });
};

export const getClassRoomById = async (classRoomId: string): Promise<IClassRoom | null> => {
  if (!mongoose.Types.ObjectId.isValid(classRoomId)) {
    throw new Error("Invalid classRoom ID");
  }
  return await ClassRoom.findById(classRoomId);
};

export const updateClassRoom = async (ClassRoomId: string, updateData: Partial<IClassRoom>): Promise<IClassRoom | null> => {
  if (!mongoose.Types.ObjectId.isValid(ClassRoomId)) {
    throw new Error("Invalid ClassRoom ID");
  }
  return await ClassRoom.findByIdAndUpdate(ClassRoomId, updateData, { new: true });
};

export const deleteClassRoom = async (ClassRoomId: string): Promise<void> => {
  if (!mongoose.Types.ObjectId.isValid(ClassRoomId)) {
    throw new Error("Invalid ClassRoom ID");
  }
  await ClassRoom.findByIdAndDelete(ClassRoomId);
};