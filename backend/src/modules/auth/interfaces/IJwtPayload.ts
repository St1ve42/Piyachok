import { User } from '../../users/entities/user.entity';
import { GlobalUserRoleEnum } from '../../users/enums/global.user.role.enum';

export interface IJwtPayload {
    role: GlobalUserRoleEnum;
    jti: string;
    isActive: boolean;
    isDeleted: boolean;
    userId: string;
}

export interface IValidatePayload {
    jti: string;
    role: GlobalUserRoleEnum;
    data: User;
}
