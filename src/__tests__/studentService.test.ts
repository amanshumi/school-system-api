import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import studentService from '../services/studentService';
import classroomService from '../services/classRoomService';
import schoolService from '../services/schoolService';
import userService from '../services/userService';
import { IStudent } from '../models/student';
import { ISchool } from '../models/school';
import { IClassRoom } from '../models/classRoom';
import { IUser } from '../models/user';
import { ROLES } from '../enums/roles';
import { UserResponseDto } from '../dto';

let mongoServer: MongoMemoryServer;

let school: ISchool;
let classroom: IClassRoom;
let user: UserResponseDto;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    // School, a valid super admin id and classroom data are needed to test student creation. 
    const userData: Partial<IUser> = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
        role: ROLES.SUPER_ADMIN,
    };

    user = await userService.createUser(userData);

    const schoolData: Partial<ISchool> = {
        name: 'Test School',
        address: {
            street: '123 Main St',
            city: 'Test City',
            state: 'Test State',
            zipCode: '12345',
        },
        superadminId: user.id,
        phoneNumber: '1234567890',
        email: 'testschool@example.com',
        website: 'http://testschool.com',
        establishedDate: new Date(),
    };

    school = await schoolService.createSchool(schoolData);

    const classroomData: Partial<IClassRoom> = {
        name: 'Test Classroom',
        capacity: 30,
        resources: ['Whiteboard', 'Projector'],
        schoolId: school.id,
    };

    classroom = await classroomService.createClassRoom(classroomData);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Student Service', () => {
    it('should enroll a new student', async () => {
        const studentData: Partial<IStudent> = {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: new Date('2005-01-01'),
            motherName: 'Jane Doe',
            studentId: 'S12345',
            grade: 10,
            schoolId: school.id,
            classroomId: classroom.id,
            email: 'johndoe@example.com',
            phoneNumber: '1234567890',
            address: {
                street: '123 Main St',
                city: 'Test City',
                state: 'Test State',
                zipCode: '12345',
            },
            enrollmentDate: new Date(),
        };

        const student = await studentService.enrollStudent(studentData);
        expect(student).toHaveProperty('id');
        expect(student.firstName).toBe('John');
    });

    it('should get a student by ID', async () => {
        const studentData: Partial<IStudent> = {
            firstName: 'Jane',
            lastName: 'Doe',
            dateOfBirth: new Date('2006-01-01'),
            motherName: 'Janet Doe',
            studentId: 'S12346',
            grade: 9,
            schoolId: school.id,
            classroomId: classroom.id,
            email: 'janedoe@example.com',
            phoneNumber: '1234567891',
            address: {
                street: '456 Main St',
                city: 'Test City',
                state: 'Test State',
                zipCode: '12345',
            },
            enrollmentDate: new Date(),
        };

        const student = await studentService.enrollStudent(studentData);
        const fetchedStudent = await studentService.getStudentById(student.id);
        expect(fetchedStudent).toHaveProperty('id');
        expect(fetchedStudent?.firstName).toBe('Jane');
    });

    it('should update a student', async () => {
        const studentData: Partial<IStudent> = {
            firstName: 'Jake',
            lastName: 'Doe',
            dateOfBirth: new Date('2007-01-01'),
            motherName: 'Janet Doe',
            studentId: 'S12347',
            grade: 8,
            schoolId: school.id,
            classroomId: classroom.id,
            email: 'jakedoe@example.com',
            phoneNumber: '1234567892',
            address: {
                street: '789 Main St',
                city: 'Test City',
                state: 'Test State',
                zipCode: '12345',
            },
            enrollmentDate: new Date(),
        };

        const student = await studentService.enrollStudent(studentData);
        const updatedStudent = await studentService.updateStudent(student.id, { firstName: 'Updated Jake' });
        expect(updatedStudent).toHaveProperty('id');
        expect(updatedStudent?.firstName).toBe('Updated Jake');
    });

    it('should delete a student', async () => {
        const studentData: Partial<IStudent> = {
            firstName: 'Jill',
            lastName: 'Doe',
            dateOfBirth: new Date('2008-01-01'),
            motherName: 'Janet Doe',
            studentId: 'S12348',
            grade: 7,
            schoolId: school.id,
            classroomId: classroom.id,
            email: 'jilldoe@example.com',
            phoneNumber: '1234567893',
            address: {
                street: '101 Main St',
                city: 'Test City',
                state: 'Test State',
                zipCode: '12345',
            },
            enrollmentDate: new Date(),
        };

        const student = await studentService.enrollStudent(studentData);
        await studentService.deleteStudent(student.id);
        const fetchedStudent = await studentService.getStudentById(student.id);
        expect(fetchedStudent).toBeNull();
    });
});