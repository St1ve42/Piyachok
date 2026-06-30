import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Inject,
} from '@nestjs/common';
import { ReviewsService } from '../reviews.service';
import { IUserRequest } from '../../auth/interfaces/IUserRequest';

export class ReviewPermissionGuard implements CanActivate {
    constructor(
        @Inject(ReviewsService) private readonly reviewService: ReviewsService,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: IUserRequest = context.switchToHttp().getRequest();
        const reviewId = req.params['id'] as string;
        const user = req.user.data;
        const hasPermission = await this.reviewService.hasPermission(
            reviewId,
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
