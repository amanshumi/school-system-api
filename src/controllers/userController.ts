import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import userService from "../services/userService";
import helpers from "../utils/helpers";

dotenv.config();

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body;

    const user = await userService.authenticateUser(username, password);
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = helpers.generateToken(user);

    res.status(200).json({ success: true, token, user });
  } catch (error) {
    helpers.handleError(error, res);
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    helpers.handleError(error, res);
  }
};

export const getUserById = async (req: Request<{id: string}>, res: Response): Promise<any> => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    helpers.handleError(error, res);
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    helpers.handleError(error, res);
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    helpers.handleError(error, res);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ success: false, message: error instanceof Error ? error.message : "Error deleting user" });
  }
};