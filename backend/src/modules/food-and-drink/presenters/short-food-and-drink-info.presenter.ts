import { PickType } from '@nestjs/swagger';
import { FoodAndDrinkOwnerInfoPresenter } from './food-and-drink-owner-info.presenter';

export class ShortFoodAndDrinkInfoPresenter extends PickType(
    FoodAndDrinkOwnerInfoPresenter,
    ['id', 'name', 'status'],
) {}
