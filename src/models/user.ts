import mongoose, { Schema, Document } from "mongoose";
import { ROLES } from "../enums/roles";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string; 
  role: ROLES; 
  assignedSchoolId?: string;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ROLES,
      required: true,
    },
    assignedSchoolId: { type: Schema.Types.ObjectId, ref: "School" },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);