import { Request, Response } from "express";
import studentService from "../services/studentService";
import helpers from "../utils/helpers";

export const enrollStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentService.enrollStudent(req.body);
    res.status(201).json({ success: true, data: student });
  } catch (error: unknown) {
    helpers.handleError(error, res);
  }
};

export const transferStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentService.transferStudent(req.params.id, req.body?.newClassroomId);
    res.status(200).json({ success: true, data: student });
  } catch (error: unknown) {
    helpers.handleError(error, res);
  }
};

export const getAllStudentsByClassroom = async (req: Request, res: Response) => {
  try {
    const students = await studentService.getStudentsByClassroom(req.params.classroomId);
    res.status(200).json({ success: true, data: {total: students.length, students: students} });
  } catch (error: unknown) {
    helpers.handleError(error, res);
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    res.status(200).json({ success: true, data: {student: student} });
  } catch (error: unknown) {
    helpers.handleError(error, res);
  }
};

export const getStudentsBySchool = async (req: Request, res: Response) => {
  try {
    const students = await studentService.getStudentsBySchool(req.params.schoolId);
    res.status(200).json({ success: true, data: {total: students.length, students: students} });
  } catch (error: unknown) {
    helpers.handleError(error, res);
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentService.updateStudent(req.params.id, req.body);
    res.status(200).json({ success: true, data: {student: student} });
  } catch (error: unknown) {
    helpers.handleError(error, res);
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    await studentService.deleteStudent(req.params.id);
    res.status(204).json({ success: true });
  } catch (error: unknown) {
    helpers.handleError(error, res);
  }
};