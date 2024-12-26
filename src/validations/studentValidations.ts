import Joi from "joi";

export const enrollStudentSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  dateOfBirth: Joi.date().required(),
  profile: Joi.string().uri(),
  schoolId: Joi.string().required(),
  classroomId: Joi.string().required(),
});

export const transferStudentSchema = Joi.object({
  classroomId: Joi.string().required(),
});

export const updateStudentSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).optional(),
  lastName: Joi.string().min(2).max(50).optional(),
  dateOfBirth: Joi.date().optional(),
  profile: Joi.string().uri().optional(),
});