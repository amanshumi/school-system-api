import mongoose, { Document, Schema } from "mongoose";

export interface IStudent extends Document {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    profile: string;
    schoolId: string;
    classroomId: string;
}

const StudentSchema: Schema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },
        profile: { type: String, default: "" },
        schoolId: { type: Schema.Types.ObjectId, ref: "School", required: true },
        classroomId: { type: Schema.Types.ObjectId, ref: "Classroom", required: true }
    },
    { timestamps: true }
);

export const Student = mongoose.model<IStudent>("Student", StudentSchema);