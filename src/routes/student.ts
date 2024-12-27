
import express, { Router } from "express";
import * as studentController from "../controllers/studentController";
import helpers from "../utils/helpers";
import { enrollStudentSchema, transferStudentSchema, updateStudentSchema } from "../validations/studentValidations";
import authMiddleware from "../middlewares/authMiddleware";
import { ROLES } from "../enums/roles";

class StudentRouter {
    router: Router;
    constructor() {
        this.router = express.Router();
        this.router.use(authMiddleware.authorize([ROLES.SCHOOL_ADMIN, ROLES.SUPER_ADMIN]));
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/", helpers.validateRequest(enrollStudentSchema), studentController.enrollStudent);
        this.router.put("/:id/transfer", helpers.validateRequest(transferStudentSchema), studentController.transferStudent);
        this.router.delete("/:id", studentController.deleteStudent);
        this.router.put("/:id", helpers.validateRequest(updateStudentSchema), studentController.updateStudent);
        this.router.get("/school/:schoolId", studentController.getStudentsBySchool);
        this.router.get("/:id", studentController.getStudentById);
        this.router.get("/classroom/:classroomId", studentController.getAllStudentsByClassroom);
    }

    getRouter() {
        return this.router;
    }
}

export default new StudentRouter().getRouter();