import { FoodAndDrinkOwnerInfoPresenter } from '../../food-and-drink/presenters/food-and-drink-owner-info.presenter';
import { Expose, Type } from 'class-transformer';
import { PickType } from '@nestjs/swagger';
import { UserPresenter } from '../../users/presenters/user.presenter';

export class OwnerPresenter extends PickType(UserPresenter, [
    'id',
    'name',
    'surname',
    'email',
    'photo',
]) {}

export class SuperadminFoodAndDrinkInfoPresenter extends FoodAndDrinkOwnerInfoPresenter {
    @Expose()
    @Type(() => OwnerPresenter)
    owner: OwnerPresenter;
}
