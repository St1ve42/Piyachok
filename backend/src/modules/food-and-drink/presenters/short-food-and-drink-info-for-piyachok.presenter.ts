import { PickType } from '@nestjs/swagger';
import { FoodAndDrinkOwnerInfoPresenter } from './food-and-drink-owner-info.presenter';

export class ShortFoodAndDrinkInfoForPiyachokPresenter extends PickType(
    FoodAndDrinkOwnerInfoPresenter,
    ['id', 'name', 'mainImage'],
) {}
