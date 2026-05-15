import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { SuperadminFoodAndDrinkSortDto } from './superadmin-food-and-drink-sort.dto';
import { SuperadminFoodAndDrinkRangeDto } from './superadmin-food-and-drink-range.dto';
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

    @IsOptional()
    @ValidateNested()
    @ApiPropertyOptional({ type: SuperadminFoodAndDrinkSortDto })
    declare sort?: SuperadminFoodAndDrinkSortDto;

    @IsOptional()
    @ValidateNested()
    declare range?: SuperadminFoodAndDrinkRangeDto;
}
