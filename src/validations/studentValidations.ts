import Joi from "joi";

export const enrollStudentSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  dateOfBirth: Joi.date().required(),
  motherName: Joi.string().min(2).max(50).required(),
  studentId: Joi.string().required(),
  grade: Joi.number().integer().min(1).max(12).required(),
  schoolId: Joi.string().required(),
  classroomId: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().min(10).max(15).required(),
  address: Joi.object({
    street: Joi.string().min(3).max(100).required(),
    city: Joi.string().min(2).max(50).required(),
    state: Joi.string().min(2).max(50).required(),
    zipCode: Joi.string().min(5).max(10).required(),
  }).required(),
  enrollmentDate: Joi.date().required(),
  isActive: Joi.boolean().default(true),
});

export const transferStudentSchema = Joi.object({
  classroomId: Joi.string().required(),
});

export const updateStudentSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).optional(),
  lastName: Joi.string().min(2).max(50).optional(),
  dateOfBirth: Joi.date().optional(),
  motherName: Joi.string().min(2).max(50).optional(),
  studentId: Joi.string().optional(),
  grade: Joi.number().integer().min(1).max(12).optional(),
  schoolId: Joi.string().optional(),
  classroomId: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phoneNumber: Joi.string().min(10).max(15).optional(),
  address: Joi.object({
    street: Joi.string().min(3).max(100).optional(),
    city: Joi.string().min(2).max(50).optional(),
    state: Joi.string().min(2).max(50).optional(),
    zipCode: Joi.string().min(5).max(10).optional(),
  }).optional(),
  enrollmentDate: Joi.date().optional(),
  isActive: Joi.boolean().optional(),
});