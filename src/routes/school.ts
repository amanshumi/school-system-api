import express, { Router } from 'express';
import * as schoolController from '../controllers/schoolController';
import helpers from '../utils/helpers';
import { createSchoolSchema, updateSchoolSchema } from '../validations/schoolValidation';
import authMiddleware from '../middlewares/authMiddleware';
import { ROLES } from '../enums/roles';

class SchoolRoutes {
    router: Router;
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(
            '/',
            authMiddleware.authorize([ROLES.SUPER_ADMIN]),
            helpers.validateRequest(createSchoolSchema),
            schoolController.createSchool
        );

        this.router.get('/', schoolController.getAllSchools);

        this.router.get(
            '/all/superadmin',
            authMiddleware.authorize([ROLES.SUPER_ADMIN]),
            schoolController.getSchoolsBySuperadmin
        );

        this.router.get('/phone/:phone', schoolController.getSchoolsByPhoneNumber);

        this.router.get('/email/:email', schoolController.getSchoolByEmail);

        this.router.get('/date/:date', schoolController.getSchoolsCreatedAfter);

        this.router.get(
            '/:id',
            authMiddleware.authorize([ROLES.SUPER_ADMIN]),
            schoolController.getSchoolById
        );

        this.router.put(
            '/:id',
            authMiddleware.authorize([ROLES.SUPER_ADMIN]),
            helpers.validateRequest(updateSchoolSchema),
            schoolController.updateSchool
        );

        this.router.delete(
            '/:id',
            authMiddleware.authorize([ROLES.SUPER_ADMIN]),
            schoolController.deleteSchool
        );
    }

    getRouter() {
        return this.router;
    }
}

export default new SchoolRoutes().getRouter();