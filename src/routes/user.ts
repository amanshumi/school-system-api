import express from "express";
import * as userController from "../controllers/userController";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/requestValidator";
import { createUserSchema, loginSchema } from "../validations/userValidation";
import { ROLES } from "../enums/roles";

const userRouter = express.Router();

userRouter.post("/", authorize([ROLES.SUPER_ADMIN]), validateRequest(createUserSchema), userController.createUser);
userRouter.post("/auth/login", validateRequest(loginSchema), userController.login);
userRouter.get("/", authorize([ROLES.SUPER_ADMIN]), userController.getAllUsers);
userRouter.get("/:id", authorize([ROLES.SUPER_ADMIN]), userController.getUserById);
userRouter.put("/:id", authorize([ROLES.SUPER_ADMIN]), userController.updateUser);
userRouter.delete("/:id", authorize([ROLES.SUPER_ADMIN]), userController.deleteUser);

export default userRouter;