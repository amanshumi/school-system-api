import express from 'express';
import { validateRequest } from '../middlewares/requestValidator';
import { createClassroomSchema, updateClassroomSchema } from '../validations/classRoomValidations';
import * as classRoomController from '../controllers/classRoomController';
import { authorize } from '../middlewares/authMiddleware';
import { ROLES } from '../enums/roles';

const classRoomRouter = express.Router();
classRoomRouter.use(authorize([ROLES.SCHOOL_ADMIN, ROLES.SUPER_ADMIN]));

classRoomRouter.post('/', validateRequest(createClassroomSchema), classRoomController.createClassroom);
classRoomRouter.get('/', classRoomController.getAllClassrooms);
classRoomRouter.get('/school/:schoolId', classRoomController.getClassRoomsBySchool);
classRoomRouter.get('/:id', classRoomController.getClassroomById);
classRoomRouter.put('/:id', validateRequest(updateClassroomSchema), classRoomController.deleteClassroom);
classRoomRouter.delete('/:id', classRoomController.deleteClassroom);

export default classRoomRouter;