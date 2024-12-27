import express, { Application } from "express";
import dotenv from "dotenv";
import { Mongoose } from "mongoose";
import connectDB from "./config/dbConnection";

import schoolRouter from "./routes/school";
import classRoomRouter from "./routes/classRoom";
import studentRouter from "./routes/student";
import userRouter from "./routes/user";
import reportingRouter from "./routes/reporting";

import { authenticate } from "./middlewares/authMiddleware";
import { apiLimiter } from "./utils/helpers";
import userService from "./services/userService";

dotenv.config();

class Server {
  private app: Application;
  private port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(authenticate);
    this.app.use(apiLimiter);
  }

  private initializeRoutes(): void {
    this.app.use("/student", studentRouter);
    this.app.use("/class-room", classRoomRouter);
    this.app.use("/school", schoolRouter);
    this.app.use("/user", userRouter);
    this.app.use("/reports", reportingRouter);
  }

  private async connectToDatabase(): Promise<Mongoose> {
    return await connectDB();
  }

  public async start(): Promise<void> {
    try {
      await this.connectToDatabase();
      console.log("Connected to DB");

      userService.initializeSuperadmin();

      this.app.listen(this.port, () => {
        console.log(`Server is running on port ${this.port}`);
      });
    } catch (error) {
      console.error("Failed to connect to DB", error);
      process.exit(1); 
    }
  }
}

export default Server;