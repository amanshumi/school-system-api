import express from "express";
import * as userController from "../controllers/userController";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/requestValidator";
import { createUserSchema, loginSchema } from "../validations/userValidation";

const userRouter = express.Router();

userRouter.post("/", validateRequest(createUserSchema), userController.createUser);
userRouter.post("/auth/login", validateRequest(loginSchema), userController.login);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;