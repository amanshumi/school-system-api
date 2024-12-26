import Joi from "joi";
import { ROLES } from "../enums/roles";



export const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid(ROLES.SCHOOL_ADMIN, ROLES.SUPER_ADMIN).required(),
  assignedSchoolId: Joi.string().optional(),
});