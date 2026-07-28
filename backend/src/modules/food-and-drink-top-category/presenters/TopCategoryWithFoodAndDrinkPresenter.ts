import { FoodAndDrinkFindOnePresenter } from '../../food-and-drink/presenters/food-and-drink-find-one.presenter';
import { Expose, Type } from 'class-transformer';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class TopCategoryWithFoodAndDrinkPresenter {
    @ApiProperty({ example: 'Сніданки', description: 'Назва топ-категорії' })
    @Expose()
    topCategory: string;

    @ApiProperty({
        type: () => [OmitType(FoodAndDrinkFindOnePresenter, ['topCategories'])],
        description: 'Список закладів, що належать до категорії',
    })
    @Expose()
    @Type(() => FoodAndDrinkFindOnePresenter)
    foodAndDrinks: FoodAndDrinkFindOnePresenter[];
}
