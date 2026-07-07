import { IsEnum, IsOptional } from 'class-validator';
import { FoodAndDrinkQueryDto } from '../../food-and-drink/dto/food-and-drink-query.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FoodAndDrinkStatusEnum } from '../../food-and-drink/enums/food-and-drink-status.enum';

export class SuperadminFoodAndDrinkQueryDto extends FoodAndDrinkQueryDto {
    @ApiPropertyOptional({
        example: 'active',
        enum: FoodAndDrinkStatusEnum,
        description:
            'Фільтр за статусом закладу (active - активний, pending - в очікуванні, inactive - неактивний)',
    })
    @IsOptional()
    @IsEnum(FoodAndDrinkStatusEnum)
    status?: FoodAndDrinkStatusEnum;
}
