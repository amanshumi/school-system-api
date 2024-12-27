import express, { Router } from "express";
import * as userController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";
import helpers from "../utils/helpers";
import { createUserSchema, loginSchema } from "../validations/userValidation";
import { ROLES } from "../enums/roles";

class UserRoutes {
    router: Router;
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/", authMiddleware.authorize([ROLES.SUPER_ADMIN]), helpers.validateRequest(createUserSchema), userController.createUser);
        this.router.post("/auth/login", helpers.validateRequest(loginSchema), userController.login);
        this.router.get("/", authMiddleware.authorize([ROLES.SUPER_ADMIN]), userController.getAllUsers);
        this.router.get("/:id", authMiddleware.authorize([ROLES.SUPER_ADMIN]), userController.getUserById);
        this.router.put("/:id", authMiddleware.authorize([ROLES.SUPER_ADMIN]), userController.updateUser);
        this.router.delete("/:id", authMiddleware.authorize([ROLES.SUPER_ADMIN]), userController.deleteUser);
    }
    getRouter() {
        return this.router;
    }
}

export default new UserRoutes().getRouter();