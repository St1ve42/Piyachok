import { PickType } from '@nestjs/swagger';
import { FoodAndDrinkInfoPresenter } from './food-and-drink-info.presenter';

export class ShortFoodAndDrinkInfoPresenter extends PickType(
    FoodAndDrinkInfoPresenter,
    ['id', 'name', 'type', 'mainImage'],
) {}
