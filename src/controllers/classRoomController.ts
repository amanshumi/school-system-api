import { Request, Response } from "express";
import classRoomService from "../services/classRoomService";
import helpers from "../utils/helpers";

export const createClassroom = async (req: Request, res: Response) => {
  try {
    const classroom = await classRoomService.createClassRoom(req.body);
    res.status(201).json({ success: true, data: classroom });
  } catch (error: unknown) {
    helpers.handleError(error, res);
  }
};

export const getAllClassrooms = async (req: Request, res: Response) => {
  try {
    const classrooms = await classRoomService.getAllClassrooms();
    res.status(200).json({ success: true, data: classrooms });
  } catch (error: unknown) {
    helpers.handleError(error, res);
  }
};  

export const getClassRoomsBySchool = async (req: Request, res: Response) => {
    try {
        const classroomBySchool = await classRoomService.getClassRoomsBySchool(req.params?.schoolId);
        res.status(200).json({success: true, data: classroomBySchool});
    } catch (error) {
        helpers.handleError(error, res);
    }
}

export const getClassroomById = async (req: Request, res: Response) => {
  try {
    const classroom = await classRoomService.getClassRoomById(req.params.id);
    res.status(200).json({ success: true, data: classroom });
  } catch (error: unknown) {
    helpers.handleError(error, res);
  }
};

export const updateClassroom = async (req: Request, res: Response) => {
  try {
    const classroom = await classRoomService.updateClassRoom(req.params.id, req.body);
    res.status(200).json({ success: true, data: classroom });
  } catch (error: unknown) {
    helpers.handleError(error, res);
  }
};

export const deleteClassroom = async (req: Request, res: Response) => {
  try {
    await classRoomService.deleteClassRoom(req.params.id);
    res.status(204).json({ success: true });
  } catch (error: unknown) {
    helpers.handleError(error, res);
  }
};