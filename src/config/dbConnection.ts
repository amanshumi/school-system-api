import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<Mongoose> => {
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
        throw new Error("MONGO_URI is not defined in .env file");
    }

    return await mongoose.connect(mongoURI);
};

export default connectDB;