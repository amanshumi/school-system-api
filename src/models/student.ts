import mongoose, { Document, Schema } from "mongoose";

export interface IStudent extends Document {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    motherName: string;
    studentId: string;
    grade: number;
    schoolId: string;
    classroomId: string;
    email: string;
    phoneNumber: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    enrollmentDate: Date;
    isActive: boolean;
}

const StudentSchema: Schema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },
        motherName: { type: String, required: true },
        studentId: { type: String, required: true },
        grade: { type: Number, required: true },
        schoolId: { type: Schema.Types.ObjectId, ref: "School", required: true },
        classroomId: { type: Schema.Types.ObjectId, ref: "Classroom", required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true }
        },
        enrollmentDate: { type: Date, required: true },
        isActive: { type: Boolean, required: true, default: true }
    },
    { timestamps: true }
);

export const Student = mongoose.model<IStudent>("Student", StudentSchema);