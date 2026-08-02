import { FoodAndDrinkOwnerInfoPresenter } from '../../food-and-drink/presenters/food-and-drink-owner-info.presenter';
import { Expose, Transform, Type } from 'class-transformer';
import { ShortUserInfoPresenter } from '../../users/presenters/short-user-info-presenter';
import { FoodAndDrink } from '../../food-and-drink/entities/food-and-drink.entity';

export class SuperadminFoodAndDrinkInfoPresenter extends FoodAndDrinkOwnerInfoPresenter {
    @Expose()
    @Transform(
        ({ obj: { rating } }: { obj: FoodAndDrink }) => {
            return rating;
        },
        { toClassOnly: true },
    )
    declare rating: number | null;

    @Expose()
    customRating: number | null;

    @Expose()
    @Type(() => ShortUserInfoPresenter)
    owner: ShortUserInfoPresenter;
}
