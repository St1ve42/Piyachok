import { Expose } from 'class-transformer';
import { FoodAndDrinkStatusEnum } from '../enums/food-and-drink-status.enum';
import { FoodAndDrinkInfoPresenter } from './food-and-drink-info.presenter';
import { ApiProperty } from '@nestjs/swagger';

export class FoodAndDrinkOwnerInfoPresenter extends FoodAndDrinkInfoPresenter {
    @ApiProperty({
        example: 'active',
        enum: ['active', 'pending', 'inactive'],
        description: 'Статус закладу (активний або неактивний)',
    })
    @Expose()
    status: FoodAndDrinkStatusEnum;

    @ApiProperty({
        example: '2024-01-15T10:30:00Z',
        description: 'Дата створення запису про закладу',
    })
    @Expose()
    createdAt: Date;

    @ApiProperty({
        example: '2024-05-01T14:45:30Z',
        description: 'Дата останнього оновлення запису про закладу',
    })
    @Expose()
    updatedAt: Date;
}
