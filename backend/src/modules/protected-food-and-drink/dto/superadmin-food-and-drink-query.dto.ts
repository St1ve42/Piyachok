import { IsOptional, ValidateNested } from 'class-validator';
import { SuperadminFoodAndDrinkSearchDto } from './superadmin-food-and-drink-search.dto';
import { SuperadminFoodAndDrinkSortDto } from './superadmin-food-and-drink-sort.dto';
import { SuperadminFoodAndDrinkRangeDto } from './superadmin-food-and-drink-range.dto';
import { FoodAndDrinkQueryDto } from '../../food-and-drink/dto/food-and-drink-query.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SuperadminFoodAndDrinkQueryDto extends FoodAndDrinkQueryDto {
    @IsOptional()
    @ValidateNested()
    @ApiPropertyOptional({ type: SuperadminFoodAndDrinkSearchDto })
    declare search?: SuperadminFoodAndDrinkSearchDto;

    @IsOptional()
    @ValidateNested()
    @ApiPropertyOptional({ type: SuperadminFoodAndDrinkSortDto })
    declare sort?: SuperadminFoodAndDrinkSortDto;

    @IsOptional()
    @ValidateNested()
    declare range?: SuperadminFoodAndDrinkRangeDto;
}
