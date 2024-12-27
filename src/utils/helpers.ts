import { Response } from "express";
import dotenv from "dotenv";
import rateLimit from 'express-rate-limit';
import jwt from "jsonwebtoken";
import { UserResponseDto } from "../dto";

dotenv.config();

class Helpers {
  handleError (error: unknown, res: Response) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'An unknown error occurred' });
    }
  };

  generateToken (user: UserResponseDto) {
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return token;
  }

  apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: parseInt(process.env.LIMIT_PER_MINUTE || '100'), // Just making it 100 for testing purposes. In a real world app, we might wanna consider the number of optimal requests per given time to determine the average limit. And it's configurable
    message: `Too many requests from this IP, please try again after 15 minutes`,
    headers: true,
  });
}

export default new Helpers();