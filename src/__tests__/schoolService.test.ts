import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import SchoolService from '../services/schoolService';
import { ISchool } from '../models/school';
import userService from '../services/userService';
import { ROLES } from '../enums/roles';
import { date } from 'joi';

jest.mock('../services/userService');

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

describe('School Service', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
    });

    it('should create a new school', async () => {
        const user = { id: '60d0fe4f5311236168a109ca', role: ROLES.SUPER_ADMIN };
        (userService.getUserById as jest.Mock).mockResolvedValue(user);

        const schoolData: Partial<ISchool> = {
            name: 'Test School',
            address: {
                street: '123 Main St',
                city: 'Test City',
                state: 'Test State',
                zipCode: '12345',
            },
            superadminId: '60d0fe4f5311236168a109ca',
            phoneNumber: '1234567890',
            email: 'testschool@example.com',
            website: 'http://testschool.com',
            establishedDate: new Date(),
        };

        const school = await SchoolService.createSchool(schoolData);
        expect(school).toHaveProperty('id');
        expect(school.name).toBe('Test School');
    });

    it('should not create a school with an existing email', async () => {
        const user = { id: '60d0fe4f5311236168a109ca', role: ROLES.SUPER_ADMIN };
        (userService.getUserById as jest.Mock).mockResolvedValue(user);

        const schoolData: Partial<ISchool> = {
            name: 'Test School',
            address: {
                street: '123 Main St',
                city: 'Test City',
                state: 'Test State',
                zipCode: '12345',
            },
            superadminId: '60d0fe4f5311236168a109ca',
            phoneNumber: '1234567890',
            email: 'testschool@example.com',
            website: 'http://testschool.com',
            establishedDate: new Date(),
        };

        // await SchoolService.createSchool(schoolData);

        await expect(SchoolService.createSchool(schoolData)).rejects.toThrow('School with this email already exists');
    });

    it('should get all schools', async () => {
        const schools = await SchoolService.getAllSchools();
        expect(schools).toBeInstanceOf(Array);
    });

    it('should get schools by superadmin ID', async () => {
        const superadminId = '60d0fe4f5311236168a109ca';
        const schools = await SchoolService.getSchoolsBySuperadmin(superadminId);
        expect(schools).toBeInstanceOf(Array);
    });

    it('should get a school by ID', async () => {
        const schoolData: Partial<ISchool> = {
            name: 'Test School 2',
            address: {
                street: '456 Main St',
                city: 'Test City',
                state: 'Test State',
                zipCode: '12345',
            },
            superadminId: '60d0fe4f5311236168a109ca',
            phoneNumber: '1234567890',
            email: 'testschool2@example.com',
            website: 'http://testschool2.com',
            establishedDate: new Date(),
        };

        const school = await SchoolService.createSchool(schoolData);
        const fetchedSchool = await SchoolService.getSchoolById(school.id);
        expect(fetchedSchool).toHaveProperty('id');
        expect(fetchedSchool?.name).toBe('Test School 2');
    });

    it('should get a school by phone number', async () => {
        const schoolData: Partial<ISchool> = {
            name: 'Test School 3',
            address: {
                street: '789 Main St',
                city: 'Test City',
                state: 'Test State',
                zipCode: '12345',
            },
            superadminId: '60d0fe4f5311236168a109ca',
            phoneNumber: '112121212',
            email: 'testschool3@example.com',
            website: 'http://testschool3.com',
            establishedDate: new Date(),
        };

        await SchoolService.createSchool(schoolData);
        const fetchedSchools = await SchoolService.getSchoolByPhoneNumber('112121212');
        expect(fetchedSchools).toBeInstanceOf(Array);
        expect(fetchedSchools?.length).toBe(1);
    });

    it('should get a school by email', async () => {
        const schoolData: Partial<ISchool> = {
            name: 'Test School 4',
            address: {
                street: '101 Main St',
                city: 'Test City',
                state: 'Test State',
                zipCode: '12345',
            },
            superadminId: '60d0fe4f5311236168a109ca',
            phoneNumber: '1234567890',
            email: 'testschool4@example.com',
            website: 'http://testschool4.com',
            establishedDate: new Date(),
        };

        await SchoolService.createSchool(schoolData);
        const fetchedSchool = await SchoolService.getSchoolByEmail('testschool4@example.com');
        expect(fetchedSchool).toHaveProperty('id');
        expect(fetchedSchool?.name).toBe('Test School 4');
    });

    it('should get schools established after a certain date', async () => {
        const time = new Date();
        const schoolData: Partial<ISchool> = {
            name: 'Test School 5',
            address: {
                street: '102 Main St',
                city: 'Test City',
                state: 'Test State',
                zipCode: '12345',
            },
            superadminId: '60d0fe4f5311236168a109ca',
            phoneNumber: '1234567890',
            email: 'testschool5@example.com',
            website: 'http://testschool5.com',
            establishedDate: new Date('2022-03-01'),
        };

        await SchoolService.createSchool(schoolData);
        const fetchedSchools = await SchoolService.getSchoolsCreatedAfter(time);
        expect(fetchedSchools).toBeInstanceOf(Array);
        expect(fetchedSchools?.[0].name).toBe('Test School 5');
    });

    it('should update a school', async () => {
        const schoolData: Partial<ISchool> = {
            name: 'Test School 6',
            address: {
                street: '103 Main St',
                city: 'Test City',
                state: 'Test State',
                zipCode: '12345',
            },
            superadminId: '60d0fe4f5311236168a109ca',
            phoneNumber: '1234567890',
            email: 'testschool6@example.com',
            website: 'http://testschool6.com',
            establishedDate: new Date(),
        };

        const school = await SchoolService.createSchool(schoolData);
        const updatedSchool = await SchoolService.updateSchool(school.id, { name: 'Updated Test School 6' });
        expect(updatedSchool).toHaveProperty('id');
        expect(updatedSchool?.name).toBe('Updated Test School 6');
    });

    it('should delete a school', async () => {
        const schoolData: Partial<ISchool> = {
            name: 'Test School 7',
            address: {
                street: '104 Main St',
                city: 'Test City',
                state: 'Test State',
                zipCode: '12345',
            },
            superadminId: '60d0fe4f5311236168a109ca',
            phoneNumber: '1234567890',
            email: 'testschool7@example.com',
            website: 'http://testschool7.com',
            establishedDate: new Date(),
        };

        const school = await SchoolService.createSchool(schoolData);
        await SchoolService.deleteSchool(school.id);
        const fetchedSchool = await SchoolService.getSchoolById(school.id);
        expect(fetchedSchool).toBeNull();
    });
});