import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validateRequest = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        details: error.details.map((detail: any) => detail.message),
      });
    }
  };
};