import { ReviewPresenter } from './ReviewPresenter';
import { ShortFoodAndDrinkInfoPresenter } from '../../food-and-drink/presenters/short-food-and-drink-info.presenter';
import { Expose, Type } from 'class-transformer';

export class ReviewWithFoodAndDrinkPresenter extends ReviewPresenter {
    @Expose()
    @Type(() => ShortFoodAndDrinkInfoPresenter)
    foodAndDrink: ShortFoodAndDrinkInfoPresenter;
}
