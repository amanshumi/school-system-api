import { ROLES } from "../enums/roles";

export class UserResponseDto {
    id: string;
    username: string;
    email: string;
    role: ROLES;
    assignedSchoolId?: string;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(user: any) {
      this.id = user._id;
      this.username = user.username;
      this.email = user.email;
      this.role = user.role;
      this.assignedSchoolId = user.assignedSchoolId;
      this.createdAt = user.createdAt;
      this.updatedAt = user.updatedAt;
    }
  }