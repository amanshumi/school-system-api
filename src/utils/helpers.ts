import { Response } from "express";
import dotenv from "dotenv";
import rateLimit from 'express-rate-limit';

dotenv.config();

export const handleError = (error: unknown, res: Response) => {
  if (error instanceof Error) {
    res.status(500).json({ success: false, message: error.message });
  } else {
    res.status(500).json({ success: false, message: 'An unknown error occurred' });
  }
};

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: parseInt(process.env.LIMIT_PER_MINUTE || '100'), // Just making it 100 for testing purposes. In a real world app, we might wanna consider the number of optimal requests per given time to determine the average limit. And it's configurable
  message: `Too many requests from this IP, please try again after 15 minutes`,
  headers: true,
});