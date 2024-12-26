import Joi from "joi";

export const createSchoolSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  address: Joi.string().min(5).required(),
  contactEmail: Joi.string().email().required(),
  superadminId: Joi.string().required(), 
});

export const updateSchoolSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  address: Joi.string().min(5),
  contactEmail: Joi.string().email(),
}).min(1); 