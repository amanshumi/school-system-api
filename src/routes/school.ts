import express, { Router } from 'express';
import * as schoolController from '../controllers/schoolController';
import { validateRequest } from '../middlewares/requestValidator';
import { createSchoolSchema, updateSchoolSchema } from '../validations/schoolValidation';
import authMiddleware from '../middlewares/authMiddleware';
import { ROLES } from '../enums/roles';

const schoolRouter = express.Router();

schoolRouter.post('/', authMiddleware.authorize([ROLES.SUPER_ADMIN]), validateRequest(createSchoolSchema), schoolController.createSchool);
schoolRouter.get('/', schoolController.getAllSchools);
schoolRouter.get('/all/superadmin', authMiddleware.authorize([ROLES.SUPER_ADMIN]), schoolController.getSchoolsBySuperadmin);
schoolRouter.get('/phone/:phone', schoolController.getSchoolsByPhoneNumber);
schoolRouter.get('/email/:email', schoolController.getSchoolByEmail);
schoolRouter.get('/date/:date', schoolController.getSchoolsCreatedAfter);
schoolRouter.get('/:id', authMiddleware.authorize([ROLES.SUPER_ADMIN]), schoolController.getSchoolById);
schoolRouter.put('/:id', authMiddleware.authorize([ROLES.SUPER_ADMIN]), validateRequest(updateSchoolSchema), schoolController.updateSchool);
schoolRouter.delete('/:id', authMiddleware.authorize([ROLES.SUPER_ADMIN]), schoolController.deleteSchool);

export default schoolRouter;