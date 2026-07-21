import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Inject,
    Injectable,
    type Type,
} from '@nestjs/common';
import { IUserRequest } from '../../modules/auth/interfaces/IUserRequest';
import { User } from '../../modules/users/entities/user.entity';
import { NewsService } from '../../modules/news/news.service';

interface CanCheckIfHasPermission {
    hasPermission: (
        resourceId: string,
        user: User,
        req: IUserRequest,
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
            const user = req.user.data;
            const hasPermission = await this.service.hasPermission(
                resourceId,
                user,
                req,
            );
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
