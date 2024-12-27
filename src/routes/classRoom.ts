import express from 'express';
import { createClassroomSchema, updateClassroomSchema } from '../validations/classRoomValidations';
import * as classRoomController from '../controllers/classRoomController';
import authMiddleware from '../middlewares/authMiddleware';
import { ROLES } from '../enums/roles';
import helpers from '../utils/helpers';

const classRoomRouter = express.Router();
classRoomRouter.use(authMiddleware.authorize([ROLES.SCHOOL_ADMIN, ROLES.SUPER_ADMIN]));

classRoomRouter.post('/', helpers.validateRequest(createClassroomSchema), classRoomController.createClassroom);
classRoomRouter.get('/', classRoomController.getAllClassrooms);
classRoomRouter.get('/school/:schoolId', classRoomController.getClassRoomsBySchool);
classRoomRouter.get('/:id', classRoomController.getClassroomById);
classRoomRouter.put('/:id', helpers.validateRequest(updateClassroomSchema), classRoomController.deleteClassroom);
classRoomRouter.delete('/:id', classRoomController.deleteClassroom);

export default classRoomRouter;