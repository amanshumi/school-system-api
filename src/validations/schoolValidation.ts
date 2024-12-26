import Joi from "joi";

export const createSchoolSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  address: Joi.object({
    street: Joi.string().min(3).max(100).required(),
    city: Joi.string().min(2).max(50).required(),
    state: Joi.string().min(2).max(50).required(),
    zipCode: Joi.string().min(5).max(10).required(),
  }).required(),
  superadminId: Joi.string().required(),
  phoneNumber: Joi.string().min(10).max(15).required(),
  email: Joi.string().email().required(),
  website: Joi.string().uri().required(),
  establishedDate: Joi.date().required(),
  isActive: Joi.boolean().default(true),
});

export const updateSchoolSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  address: Joi.object({
    street: Joi.string().min(3).max(100).optional(),
    city: Joi.string().min(2).max(50).optional(),
    state: Joi.string().min(2).max(50).optional(),
    zipCode: Joi.string().min(5).max(10).optional(),
  }).optional(),
  superadminId: Joi.string().optional(),
  phoneNumber: Joi.string().min(10).max(15).optional(),
  email: Joi.string().email().optional(),
  website: Joi.string().uri().optional(),
  establishedDate: Joi.date().optional(),
  isActive: Joi.boolean().optional(),
});