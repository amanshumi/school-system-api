import mongoose, { Document, Schema } from "mongoose";

export interface IClassRoom extends Document {
    name: string;
    capacity: number;
    resources: string[];
    schoolId: string; // Associated school
  }
  
  const ClassRoomSchema: Schema = new Schema(
    {
      name: { type: String, required: true },
      capacity: { type: Number, required: true },
      resources: { type: [String], default: [] },
      schoolId: { type: Schema.Types.ObjectId, ref: "School", required: true }
    },
    { timestamps: true }
  );
  
  export const ClassRoom = mongoose.model<IClassRoom>("Classroom", ClassRoomSchema);