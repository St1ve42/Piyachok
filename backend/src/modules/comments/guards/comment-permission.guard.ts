import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Inject,
} from '@nestjs/common';
import { IUserRequest } from '../../auth/interfaces/IUserRequest';
import { CommentsService } from '../comments.service';

export class CommentPermissionGuard implements CanActivate {
    constructor(
        @Inject(CommentsService)
        private readonly commentsService: CommentsService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<IUserRequest>();
        const commentId = request.params['id'] as string;
        const user = request.user.data;
        const hasPermission = await this.commentsService.hasPermission(
            commentId,
            user,
        );
        if (!hasPermission) {
            throw new ForbiddenException(
                'Ви не можете змінювати чи видаляти відгук інакшого користувача.',
            );
        }
        return hasPermission;
    }
}
