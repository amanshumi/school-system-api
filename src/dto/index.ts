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
      this.id = user?._id || user?.id;
      this.username = user.username;
      this.email = user.email;
      this.role = user.role;
      this.assignedSchoolId = user.assignedSchoolId;
      this.createdAt = user.createdAt;
      this.updatedAt = user.updatedAt;
    }
}

export class UserLoginDTO {
    email: string;
    password: string;

    constructor(user: any) {
        this.email = user.email;
        this.password = user.password;
    }
}