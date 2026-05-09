import { FoodAndDrinkStatusEnum } from '../../food-and-drink/enums/food-and-drink-status.enum';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SuperadminFoodAndDrinkStatusDto {
    @ApiProperty({
        enum: FoodAndDrinkStatusEnum,
        example: 'active',
        description:
            'Новий статус закладу (active - активний, pending - в очікуванні, inactive - неактивний)',
    })
    @IsEnum(FoodAndDrinkStatusEnum)
    status: FoodAndDrinkStatusEnum;
}
