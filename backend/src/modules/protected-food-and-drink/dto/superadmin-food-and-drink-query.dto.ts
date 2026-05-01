import { BaseQueryDto } from '../../../shared/dto/base-query.dto';
import {
    IsNumber,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
    ValidateNested,
} from 'class-validator';
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

    @IsOptional()
    @IsNumber()
    @Min(-90)
    @MaxLength(90)
    lat?: number;

    @IsOptional()
    @IsString()
    @Min(-180)
    @Max(180)
    lng?: number;
}
