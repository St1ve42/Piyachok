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

    @IsOptional()
    @IsNumber()
    @Min(-90)
    @Max(90)
    lat?: number;

    @IsOptional()
    @IsNumber()
    @Min(-180)
    @Max(180)
    lng?: number;
}
