import { BaseQueryDto } from '../../../shared/dto/base-query.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { SuperadminFoodAndDrinkSearchDto } from './superadmin-food-and-drink-search.dto';
import { SuperadminFoodAndDrinkSortDto } from './superadmin-food-and-drink-sort.dto';
import { SuperadminFoodAndDrinkRangeDto } from './superadmin-food-and-drink-range.dto';

export class SuperadminFoodAndDrinkQueryDto extends BaseQueryDto {
    @IsOptional()
    @ValidateNested()
    search?: SuperadminFoodAndDrinkSearchDto;

    @IsOptional()
    @ValidateNested()
    sort?: SuperadminFoodAndDrinkSortDto;

    @IsOptional()
    @ValidateNested()
    range?: SuperadminFoodAndDrinkRangeDto;
}
