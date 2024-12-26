import express, { Router } from 'express';
import * as schoolController from '../controllers/schoolController';
import { validateRequest } from '../middlewares/requestValidator';
import { createSchoolSchema, updateSchoolSchema } from '../validations/schoolValidation';

const schoolRouter = express.Router();

schoolRouter.post('/', validateRequest(createSchoolSchema), schoolController.createSchool);
schoolRouter.get('/', schoolController.getAllSchools);
schoolRouter.get('/:id', schoolController.getSchoolById);
schoolRouter.put('/:id', validateRequest(updateSchoolSchema), schoolController.updateSchool);
schoolRouter.delete('/:id', schoolController.deleteSchool);

export default schoolRouter;