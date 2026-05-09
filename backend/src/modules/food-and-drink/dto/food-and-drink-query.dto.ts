import { BaseQueryDto } from '../../../shared/dto/base-query.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { FoodAndDrinkSearchDto } from './food-and-drink-search.dto';
import { FoodAndDrinkSortDto } from './food-and-drink-sort.dto';
import { FoodAndDrinkRangeDto } from './food-and-drink-range.dto';
import { CoordinatesDto } from './location.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FoodAndDrinkQueryDto extends BaseQueryDto {
    @ApiPropertyOptional({
        description: 'Параметри пошуку закладів',
    })
    @IsOptional()
    @ValidateNested()
    search?: FoodAndDrinkSearchDto;

    @ApiPropertyOptional({
        description: 'Параметри сортування результатів',
    })
    @IsOptional()
    @ValidateNested()
    sort?: FoodAndDrinkSortDto;

    @ApiPropertyOptional({
        description: 'Діапазони для фільтрації даних',
    })
    @IsOptional()
    @ValidateNested()
    range?: FoodAndDrinkRangeDto;

    @ApiPropertyOptional({
        example: {
            lat: 50.4501,
            lng: 30.5234,
        },
        description:
            'Географічні координати користувача для обчислення відстані',
    })
    @IsOptional()
    @ValidateNested()
    userCoordinates?: CoordinatesDto;
}
