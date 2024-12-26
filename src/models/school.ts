import mongoose, { Document, Schema } from "mongoose";

export interface ISchool extends Document {
    name: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    superadminId: string;
    phoneNumber: string;
    email: string;
    website: string;
    establishedDate: Date;
    isActive: boolean;
}

const SchoolSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true }
        },
        superadminId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
        website: { type: String, required: true },
        establishedDate: { type: Date, required: true },
        isActive: { type: Boolean, required: true, default: true }
    },
    { timestamps: true }
);

export const School = mongoose.model<ISchool>("School", SchoolSchema);