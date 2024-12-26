import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

import * as userService from "../services/userService";
import { UserLoginDTO } from "../dto";

dotenv.config();

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await userService.authenticateUser(email, password);
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.status(200).json({ success: true, token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Authentication failed" });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error instanceof Error ? error.message : "Error creating user" });
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
    res.status(400).json({ success: false, message: error instanceof Error ? error.message : "Error fetching user" });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Error fetching users" });
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
    res.status(400).json({ success: false, message: error instanceof Error ? error.message : "Error updating user" });
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