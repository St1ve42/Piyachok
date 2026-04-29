import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { IUserRequest } from '../../modules/auth/interfaces/IUserRequest';
import { GlobalUserRoleEnum } from '../../modules/users/enums/global.user.role.enum';

export class IsSuperadminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest<IUserRequest>();
        const { user } = req;
        const isSuperAdmin = user.role === GlobalUserRoleEnum.SUPERADMIN;
        if (!isSuperAdmin) {
            throw new ForbiddenException(
                'У Вас недостатньо прав для здійснення цієї дії.',
            );
        }
        return true;
    }
}
