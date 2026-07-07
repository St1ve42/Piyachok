import { CommentPresenter } from './comment.presenter';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ShortFoodAndDrinkInfoPresenter } from '../../food-and-drink/presenters/short-food-and-drink-info.presenter';

export class CommentUserPresenter extends CommentPresenter {
    @ApiProperty({
        description: 'Інформація про заклад, до якого був залишено коментар',
    })
    @Expose()
    @Type(() => ShortFoodAndDrinkInfoPresenter)
    foodAndDrink: ShortFoodAndDrinkInfoPresenter;
}
