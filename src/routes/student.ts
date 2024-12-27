
import express from "express";
import * as studentController from "../controllers/studentController";
import helpers from "../utils/helpers";
import { enrollStudentSchema, transferStudentSchema, updateStudentSchema } from "../validations/studentValidations";
import authMiddleware from "../middlewares/authMiddleware";
import { ROLES } from "../enums/roles";

const studentRouter = express.Router();

studentRouter.use(authMiddleware.authorize([ROLES.SCHOOL_ADMIN, ROLES.SUPER_ADMIN]));

studentRouter.post("/", helpers.validateRequest(enrollStudentSchema), studentController.enrollStudent);
studentRouter.put("/:id/transfer", helpers.validateRequest(transferStudentSchema), studentController.transferStudent);
studentRouter.delete("/:id", studentController.deleteStudent);
studentRouter.put("/:id", helpers.validateRequest(updateStudentSchema), studentController.updateStudent);
studentRouter.get("/school/:schoolId", studentController.getStudentsBySchool);
studentRouter.get("/:id", studentController.getStudentById);
studentRouter.get("/classroom/:classroomId", studentController.getAllStudentsByClassroom);

export default studentRouter;
