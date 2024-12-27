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

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
});

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
});

export default connectDB;