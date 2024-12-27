import express from "express";
import * as userController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/requestValidator";
import { createUserSchema, loginSchema } from "../validations/userValidation";
import { ROLES } from "../enums/roles";

const userRouter = express.Router();

userRouter.post("/", authMiddleware.authorize([ROLES.SUPER_ADMIN]), validateRequest(createUserSchema), userController.createUser);
userRouter.post("/auth/login", validateRequest(loginSchema), userController.login);
userRouter.get("/", authMiddleware.authorize([ROLES.SUPER_ADMIN]), userController.getAllUsers);
userRouter.get("/:id", authMiddleware.authorize([ROLES.SUPER_ADMIN]), userController.getUserById);
userRouter.put("/:id", authMiddleware.authorize([ROLES.SUPER_ADMIN]), userController.updateUser);
userRouter.delete("/:id", authMiddleware.authorize([ROLES.SUPER_ADMIN]), userController.deleteUser);

export default userRouter;