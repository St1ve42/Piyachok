import { FoodAndDrinkNewsPresenter } from './FoodAndDrinkNewsPresenter';
import { Expose, Type } from 'class-transformer';
import { ShortFoodAndDrinkInfoPresenter } from '../../food-and-drink/presenters/short-food-and-drink-info.presenter';
import { ApiProperty } from '@nestjs/swagger';

export class GeneralNewsPresenter extends FoodAndDrinkNewsPresenter {
    @ApiProperty({
        type: ShortFoodAndDrinkInfoPresenter,
        description: 'Коротка інформація про заклад',
    })
    @Expose()
    @Type(() => ShortFoodAndDrinkInfoPresenter)
    foodAndDrink: ShortFoodAndDrinkInfoPresenter;
}
