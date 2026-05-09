import { FoodAndDrinkSearchDto } from '../../food-and-drink/dto/food-and-drink-search.dto';
import { FoodAndDrinkStatusEnum } from '../../food-and-drink/enums/food-and-drink-status.enum';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SuperadminFoodAndDrinkSearchDto extends FoodAndDrinkSearchDto {
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
