import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TO_IGNORE_PATHS } from "../utils/constants";
import { IUser } from "../models/user";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

class AuthMiddleware {
  authenticate(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(" ")[1];
    if (TO_IGNORE_PATHS.includes(req.path)) {
      next();
      return;
    }
    if (!token) {
      res.status(401).json({ success: false, message: "Unauthorized." });
      return;
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      (req as any).user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ success: false, message: "Invalid token" });
    }
  }

  authorize(roles: string[]): any {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user;
      if (!roles.includes(user.role)) {
        return res.status(403).json({ success: false, message: "Access denied" });
      }
      next();
    };
  }
}

export default new AuthMiddleware();