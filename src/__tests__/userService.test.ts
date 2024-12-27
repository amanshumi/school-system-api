import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import userService from '../services/userService';
import { IUser } from '../models/user';
import { ROLES } from '../enums/roles';

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

describe('User Service', () => {
    it('should create a new user', async () => {
        const userData: Partial<IUser> = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            role: ROLES.SCHOOL_ADMIN,
        };

        const user = await userService.createUser(userData);
        expect(user).toHaveProperty('id');
        expect(user.username).toBe('testuser');
        expect(user.email).toBe('testuser@example.com');
    });

    it('should login a user', async () => {
        const username = 'testuser';
        const password = 'password123';

        const token = await userService.authenticateUser(username, password);
        expect(token).toBeDefined();
    });

    it('should not login a user with incorrect password', async () => {
        const username = 'testuser';
        const password = 'wrongpassword';

        await expect(userService.authenticateUser(username, password)).rejects.toThrow('Invalid credentials');
    });

    it('should get a user by ID', async () => {
        const userData: Partial<IUser> = {
            username: 'testuser2',
            email: 'testuser2@example.com',
            password: 'password123',
            role: ROLES.SCHOOL_ADMIN,
        };

        const user = await userService.createUser(userData);
        const fetchedUser = await userService.getUserById(user.id);
        expect(fetchedUser).toHaveProperty('id');
        expect(fetchedUser?.username).toBe('testuser2');
    });
});