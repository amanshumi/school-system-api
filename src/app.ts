import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection";
import { Mongoose } from "mongoose";

import schoolRouter from "./routes/school";
import classRoomRouter from "./routes/classRoom";
import studentRouter from "./routes/student";
import userRouter from "./routes/user";
import { authenticate } from "./middlewares/authMiddleware";
import { initializeSuperadmin } from "./services/userService";
import reportingRouter from "./routes/reporting";

dotenv.config();

const app: express.Application = express();
app.use(express.json());
app.use(authenticate)

app.use('/student', studentRouter);
app.use('/class-room', classRoomRouter);
app.use('/school', schoolRouter);
app.use('/user', userRouter);
app.use('/reports', reportingRouter);

connectDB().then((connection: Mongoose) => {
    console.log('Connected to DB');

    initializeSuperadmin();

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((err: any) => {
    console.error('Failed to connect to DB');
})

