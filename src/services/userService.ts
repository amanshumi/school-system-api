import { User, IUser } from "../models/user";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { UserResponseDto } from "../dto";
import { ROLES } from "../enums/roles";

export const initializeSuperadmin = async (): Promise<void> => {
  try {
    const superadminExists = await User.findOne({ role: ROLES.SUPER_ADMIN });

    if (superadminExists) {
      console.log("Superadmin already exists. Skipping initialization.");
      return;
    }

    const superadminEmail = process.env.SUPERADMIN_EMAIL;
    const superadminUsername = process.env.SUPERADMIN_USERNAME;
    const superadminPassword = process.env.SUPERADMIN_PASSWORD;

    if (!superadminEmail || !superadminUsername || !superadminPassword) {
      console.error("Superadmin credentials are not set in environment variables.");
      process.exit(1);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(superadminPassword, salt);

    const superadmin = new User({
      username: superadminUsername,
      email: superadminEmail,
      password: hashedPassword,
      role: ROLES.SUPER_ADMIN,
    });

    await superadmin.save();

    console.log("Superadmin created successfully.");
  } catch (error) {
    console.error("Error initializing Superadmin:", error);
    process.exit(1);
  }
};

export const createUser = async (userData: Partial<IUser>): Promise<UserResponseDto> => {
    const userExists = await User.findOne({
        $or: [
            { email: userData?.email },
            { username: userData?.username }
        ]
    });

    console.log("USER: ", userExists);

    if (userExists) {
        throw new Error('User already exists with this email or username');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password!, salt);

    const user = new User({ ...userData, password: hashedPassword });
    return new UserResponseDto(await user.save());
};

export const getUserById = async (userId: string): Promise<UserResponseDto | null> => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID");
    }
    return new UserResponseDto(await User.findById(userId).populate("assignedSchoolId") || {});
};

export const getAllUsers = async (): Promise<UserResponseDto[]> => {
    return (await User.find().populate("assignedSchoolId")).map((user) => new UserResponseDto(user));
};

export const updateUser = async (userId: string, updateData: Partial<IUser>): Promise<UserResponseDto | null> => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID");
    }

    if (updateData.password) {
        delete updateData?.password;
    }

    console.log("DATA: ", updateData);

    return new UserResponseDto(await User.findByIdAndUpdate(userId, updateData, { new: true }));
};

export const deleteUser = async (userId: string): Promise<void> => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID");
    }
    await User.findByIdAndDelete(userId);
};

export const authenticateUser = async (username: string, password: string): Promise<UserResponseDto | null> => {
    const user = await User.findOne({ username });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? new UserResponseDto(user) : null;
};