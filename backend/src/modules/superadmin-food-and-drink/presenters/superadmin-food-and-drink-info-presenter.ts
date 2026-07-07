import { FoodAndDrinkOwnerInfoPresenter } from '../../food-and-drink/presenters/food-and-drink-owner-info.presenter';
import { Expose, Type } from 'class-transformer';
import { ShortUserInfoPresenter } from '../../users/presenters/short-user-info-presenter';

export class SuperadminFoodAndDrinkInfoPresenter extends FoodAndDrinkOwnerInfoPresenter {
    @Expose()
    @Type(() => ShortUserInfoPresenter)
    owner: ShortUserInfoPresenter;
}
