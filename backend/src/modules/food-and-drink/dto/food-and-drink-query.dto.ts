import { BaseQueryDto } from '../../../shared/dto/base-query.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { FoodAndDrinkSearchDto } from './food-and-drink-search.dto';
import { FoodAndDrinkSortDto } from './food-and-drink-sort.dto';
import { FoodAndDrinkRangeDto } from './food-and-drink-range.dto';

export class FoodAndDrinkQueryDto extends BaseQueryDto {
    @IsOptional()
    @ValidateNested()
    search?: FoodAndDrinkSearchDto;

    @IsOptional()
    @ValidateNested()
    sort?: FoodAndDrinkSortDto;

    @IsOptional()
    @ValidateNested()
    range?: FoodAndDrinkRangeDto;
}
