import { User } from '../../users/entities/user.entity';
import { GlobalUserRoleEnum } from '../../users/enums/global.user.role.enum';

interface IBaseJwtPayload {
    role: GlobalUserRoleEnum;
    jti: string;
    isActive: boolean;
    isDeleted: boolean;
}

export interface IJwtPayload extends IBaseJwtPayload {
    userId: string;
}

export interface IExtendedJwtPayload extends IBaseJwtPayload {
    fullData: User;
}
