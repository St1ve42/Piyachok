import { Expose } from 'class-transformer';
import { FoodAndDrink } from '../entities/food-and-drink.entity';
import { FoodAndDrinkStatusEnum } from '../enums/food-and-drink-status.enum';
import { FoodAndDrinkInfoPresenter } from './food-and-drink-info.presenter';

export class FoodAndDrinkOwnerInfoPresenter extends FoodAndDrinkInfoPresenter {
    @Expose()
    status: FoodAndDrinkStatusEnum;
    @Expose()
    createdAt: Date;
    @Expose()
    updatedAt: Date;
    constructor(foodAndDrink: Partial<FoodAndDrink>) {
        super(foodAndDrink);
        Object.assign(this, {
            foodAndDrink,
        });
    }
}
