import { ReviewPresenter } from './ReviewPresenter';
import { ShortFoodAndDrinkInfoPresenter } from '../../food-and-drink/presenters/short-food-and-drink-info.presenter';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewWithFoodAndDrinkPresenter extends ReviewPresenter {
    @ApiProperty({
        description: 'Інформація про заклад, якому присвячено відгук',
    })
    @Expose()
    @Type(() => ShortFoodAndDrinkInfoPresenter)
    foodAndDrink: ShortFoodAndDrinkInfoPresenter;
}
