import mongoose from "mongoose";
import { ClassRoom } from "../models/classRoom";
import { IClassRoom } from "../models/classRoom";

class ClassRoomService {
  async createClassRoom(classRoomData: Partial<IClassRoom>): Promise<IClassRoom> {
    const classRoom = new ClassRoom(classRoomData);

    const existingClassRoom = await ClassRoom.findOne({ name: classRoom.name });
    if (existingClassRoom) {
      throw new Error("Classroom with this name already exists");
    }

    return await classRoom.save();
  }

  async getAllClassrooms(): Promise<IClassRoom[]> {
    return await ClassRoom.find();
  }

  async getClassRoomsBySchool(schoolId: string): Promise<IClassRoom[]> {
    if (!mongoose.Types.ObjectId.isValid(schoolId)) {
      throw new Error("Invalid school ID");
    }
    return await ClassRoom.find({ schoolId });
  }

  async getClassRoomById(classRoomId: string): Promise<IClassRoom | null> {
    if (!mongoose.Types.ObjectId.isValid(classRoomId)) {
      throw new Error("Invalid classRoom ID");
    }
    return await ClassRoom.findById(classRoomId);
  }

  async updateClassRoom(classRoomId: string, updateData: Partial<IClassRoom>): Promise<IClassRoom | null> {
    if (!mongoose.Types.ObjectId.isValid(classRoomId)) {
      throw new Error("Invalid ClassRoom ID");
    }
    return await ClassRoom.findByIdAndUpdate(classRoomId, updateData, { new: true });
  }

  async deleteClassRoom(classRoomId: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(classRoomId)) {
      throw new Error("Invalid ClassRoom ID");
    }
    await ClassRoom.findByIdAndDelete(classRoomId);
  }
}

export default new ClassRoomService();