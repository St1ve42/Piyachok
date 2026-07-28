import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Inject,
    Injectable,
    type Type,
} from '@nestjs/common';
import { IUserRequest } from '../../modules/auth/interfaces/IUserRequest';
import { NewsService } from '../../modules/news/news.service';
import { GlobalUserRoleEnum } from '../../modules/users/enums/global.user.role.enum';
import { PiyachokService } from '../../modules/piyachok/piyachok.service';
import { isUUID } from 'class-validator';
import { PiyachokRepliesService } from '../../modules/piyachok-replies/piyachok-replies.service';

interface CanCheckIfHasPermission {
    hasPermission: (
        resourceId: string,
        userId: string,
        req?: IUserRequest,
    ) => Promise<boolean>;
}

export const createCanManageResourceGuard = (
    Service: Type<CanCheckIfHasPermission>,
    errorMessage: string,
) => {
    class CanManageResourceGuard implements CanActivate {
        constructor(
            @Inject(Service)
            readonly service: CanCheckIfHasPermission,
        ) {}
        async canActivate(context: ExecutionContext): Promise<boolean> {
            const req = context.switchToHttp().getRequest<IUserRequest>();
            const resourceId = req.params['id'] as string;
            if (!isUUID(resourceId)) {
                throw new BadRequestException(
                    `Id ${resourceId} не є коректним. Воно має бути формату uuid (наприклад, e2fecad4-8ca7-4a76-8354-8331309df863)`,
                );
            }
            const user = req.user.data;
            const {
                id: userId,
                role: { name: roleName },
            } = user;
            const hasPermission =
                (await this.service.hasPermission(resourceId, userId, req)) ||
                roleName === (GlobalUserRoleEnum.SUPERADMIN as string);
            if (!hasPermission) {
                throw new ForbiddenException(errorMessage);
            }
            return hasPermission;
        }
    }

    return CanManageResourceGuard;
};

@Injectable()
export class CanManageNewsGuard extends createCanManageResourceGuard(
    NewsService,
    'Ви не можете змінювати новини інакшого закладу',
) {}

@Injectable()
export class CanManagePiyachokGuard extends createCanManageResourceGuard(
    PiyachokService,
    'Ви не можете змінювати пиячок інакшого користувача',
) {}

@Injectable()
export class CanManagePiyachokRepliesGuard extends createCanManageResourceGuard(
    PiyachokRepliesService,
    'Ви не можете змінювати відповідь на пиячок інакшого користувача',
) {}
