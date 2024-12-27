import { Request, Response } from "express";
import * as studentService from "../services/studentService";

export const enrollStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentService.enrollStudent(req.body);
    res.status(201).json({ success: true, data: student });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const transferStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentService.transferStudent(req.params.id, req.body?.newClassroomId);
    res.status(200).json({ success: true, data: student });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const getAllStudentsByClassroom = async (req: Request, res: Response) => {
  try {
    const students = await studentService.getStudentsByClassroom(req.params.classroomId);
    res.status(200).json({ success: true, data: {total: students.length, students: students} });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    res.status(200).json({ success: true, data: {student: student} });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const getStudentsBySchool = async (req: Request, res: Response) => {
  try {
    const students = await studentService.getStudentsBySchool(req.params.schoolId);
    res.status(200).json({ success: true, data: {total: students.length, students: students} });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentService.updateStudent(req.params.id, req.body);
    res.status(200).json({ success: true, data: {student: student} });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    await studentService.deleteStudent(req.params.id);
    res.status(204).json({ success: true });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

const handleError = (error: unknown, res: Response) => {
  if (error instanceof Error) {
    res.status(500).json({ success: false, message: error.message });
  } else {
    res.status(500).json({ success: false, message: 'An unknown error occurred' });
  }
};