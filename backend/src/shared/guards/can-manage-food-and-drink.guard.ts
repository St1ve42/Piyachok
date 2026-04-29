import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Inject,
} from '@nestjs/common';
import { FoodAndDrinkService } from '../../modules/food-and-drink/food-and-drink.service';
import { IUserRequest } from '../../modules/auth/interfaces/IUserRequest';
import { GlobalUserRoleEnum } from '../../modules/users/enums/global.user.role.enum';

export class CanManageFoodAndDrinkGuard implements CanActivate {
    constructor(@Inject() private foodAndDrink: FoodAndDrinkService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<IUserRequest>();
        const { user } = req;
        const foodAndDrinkRequestId = req.params['id'] as string;
        const foodAndDrink = await this.foodAndDrink.findOneByParams({
            ownerId: user.data.id,
        });
        const isOwner =
            foodAndDrink && foodAndDrink.id === foodAndDrinkRequestId;
        const isSuperAdmin = user.role === GlobalUserRoleEnum.SUPERADMIN;
        if (!isOwner && !isSuperAdmin) {
            throw new ForbiddenException(
                'Вам заборонено редагувати цей заклад, оскільки Ви не є його власником.',
            );
        }
        return true;
    }
}
