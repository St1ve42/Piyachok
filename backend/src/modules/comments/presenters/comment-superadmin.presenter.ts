import { CommentPresenter } from './comment.presenter';
import { ShortFoodAndDrinkInfoPresenter } from '../../food-and-drink/presenters/short-food-and-drink-info.presenter';
import { ShortUserInfoPresenter } from '../../users/presenters/short-user-info-presenter';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CommentSuperadminPresenter extends CommentPresenter {
    @ApiProperty({
        description: 'Інформація про заклад, до якого був залишено коментар',
    })
    @Expose()
    @Type(() => ShortFoodAndDrinkInfoPresenter)
    foodAndDrink: ShortFoodAndDrinkInfoPresenter;

    @ApiProperty({
        description: 'Інформація про користувача, який залишив коментар',
    })
    @Expose()
    @Type(() => ShortUserInfoPresenter)
    user: ShortUserInfoPresenter;
}
