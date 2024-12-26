
import express from "express";
import * as studentController from "../controllers/studentController";
import { validateRequest } from "../middlewares/requestValidator";
import { enrollStudentSchema, transferStudentSchema, updateStudentSchema } from "../validations/studentValidations";

const studentRouter = express.Router();

studentRouter.post("/", validateRequest(enrollStudentSchema), studentController.enrollStudent);
studentRouter.put("/:id/transfer", validateRequest(transferStudentSchema), studentController.transferStudent);
studentRouter.get("/:classroomId", studentController.getAllStudentsByClassroom);
studentRouter.delete("/:id", studentController.deleteStudent);
studentRouter.put("/:id", validateRequest(updateStudentSchema), studentController.updateStudent);
studentRouter.get("/:schoolId", studentController.getStudentsBySchool);
studentRouter.get("/:id", studentController.getStudentById);
studentRouter.get("/:id/classroom", studentController.getAllStudentsByClassroom);

export default studentRouter;
