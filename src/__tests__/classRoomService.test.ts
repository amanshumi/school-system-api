import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import classroomService from '../services/classRoomService';
import { IClassRoom } from '../models/classRoom';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Classroom Service', () => {
    it('should create a new classroom', async () => {
        const classroomData: Partial<IClassRoom> = {
            name: 'Test Classroom',
            capacity: 30,
            resources: ['Whiteboard', 'Projector'],
            schoolId: '60d0fe4f5311236168a109ca',
        };

        const classroom = await classroomService.createClassRoom(classroomData);
        expect(classroom).toHaveProperty('_id');
        expect(classroom.name).toBe('Test Classroom');
    });

    it('should get all classrooms', async () => {
        const classrooms = await classroomService.getAllClassrooms();
        expect(classrooms).toBeInstanceOf(Array);
    });

    it('should get a classroom by ID', async () => {
        const classroomData: Partial<IClassRoom> = {
            name: 'Test Classroom 2',
            capacity: 30,
            resources: ['Whiteboard', 'Projector'],
            schoolId: '60d0fe4f5311236168a109ca',
        };

        const classroom = await classroomService.createClassRoom(classroomData);
        const fetchedClassroom = await classroomService.getClassRoomById(classroom.id);
        expect(fetchedClassroom).toHaveProperty('_id');
        expect(fetchedClassroom?.name).toBe('Test Classroom 2');
    });

    it('should update a classroom', async () => {
        const classroomData: Partial<IClassRoom> = {
            name: 'Test Classroom 3',
            capacity: 30,
            resources: ['Whiteboard', 'Projector'],
            schoolId: '60d0fe4f5311236168a109ca',
        };

        const classroom = await classroomService.createClassRoom(classroomData);
        const updatedClassroom = await classroomService.updateClassRoom(classroom.id, { name: 'Updated Test Classroom 3' });
        expect(updatedClassroom).toHaveProperty('_id');
        expect(updatedClassroom?.name).toBe('Updated Test Classroom 3');
    });

    it('should delete a classroom', async () => {
        const classroomData: Partial<IClassRoom> = {
            name: 'Test Classroom 4',
            capacity: 30,
            resources: ['Whiteboard', 'Projector'],
            schoolId: '60d0fe4f5311236168a109ca',
        };

        const classroom = await classroomService.createClassRoom(classroomData);
        await classroomService.deleteClassRoom(classroom.id);
        const fetchedClassroom = await classroomService.getClassRoomById(classroom.id);
        expect(fetchedClassroom).toBeNull();
    });
});