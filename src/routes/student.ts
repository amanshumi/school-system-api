
import express from "express";
import * as studentController from "../controllers/studentController";
import { validateRequest } from "../middlewares/requestValidator";
import { enrollStudentSchema, transferStudentSchema, updateStudentSchema } from "../validations/studentValidations";
import { authorize } from "../middlewares/authMiddleware";
import { ROLES } from "../enums/roles";

const studentRouter = express.Router();

studentRouter.use(authorize([ROLES.SCHOOL_ADMIN, ROLES.SUPER_ADMIN]));

studentRouter.post("/", validateRequest(enrollStudentSchema), studentController.enrollStudent);
studentRouter.put("/:id/transfer", validateRequest(transferStudentSchema), studentController.transferStudent);
studentRouter.delete("/:id", studentController.deleteStudent);
studentRouter.put("/:id", validateRequest(updateStudentSchema), studentController.updateStudent);
studentRouter.get("/school/:schoolId", studentController.getStudentsBySchool);
studentRouter.get("/:id", studentController.getStudentById);
studentRouter.get("/classroom/:classroomId", studentController.getAllStudentsByClassroom);

export default studentRouter;
