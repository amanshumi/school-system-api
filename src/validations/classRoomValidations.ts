import Joi from "joi";

export const createClassroomSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  capacity: Joi.number().integer().min(1).required(),
  resources: Joi.array().items(Joi.string()),
  schoolId: Joi.string().required(),
});

export const updateClassroomSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  capacity: Joi.number().integer().min(1),
  resources: Joi.array().items(Joi.string()),
}).min(1);