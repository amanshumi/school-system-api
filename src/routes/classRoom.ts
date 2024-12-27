import express, { Router } from 'express';
import { createClassroomSchema, updateClassroomSchema } from '../validations/classRoomValidations';
import * as classRoomController from '../controllers/classRoomController';
import authMiddleware from '../middlewares/authMiddleware';
import { ROLES } from '../enums/roles';
import helpers from '../utils/helpers';

class ClassRoomRoutes {
    router: Router;
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
        this.router.use(authMiddleware.authorize([ROLES.SCHOOL_ADMIN, ROLES.SUPER_ADMIN]));
    }
    initializeRoutes() {
        this.router.post('/', helpers.validateRequest(createClassroomSchema), classRoomController.createClassroom);
        this.router.get('/', classRoomController.getAllClassrooms);
        this.router.get('/school/:schoolId', classRoomController.getClassRoomsBySchool);
        this.router.get('/:id', classRoomController.getClassroomById);
        this.router.put('/:id', helpers.validateRequest(updateClassroomSchema), classRoomController.deleteClassroom);
        this.router.delete('/:id', classRoomController.deleteClassroom);
    }
    getRouter() {
        return this.router;
    }
}

export default new ClassRoomRoutes().getRouter();