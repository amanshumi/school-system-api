import mongoose, { Schema, Document } from "mongoose";

export interface ISchool extends Document {
    name: string;
    address: string;
    contactEmail: string;
    superadminId: string; 
}

const SchoolSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        contactEmail: { type: String, required: true },
        superadminId: { type: Schema.Types.ObjectId, ref: "User", required: true }
    },
    { timestamps: true }
);

export const School = mongoose.model<ISchool>("School", SchoolSchema);