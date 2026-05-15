import { BaseQueryDto } from '../../../shared/dto/base-query.dto';
import {
    ArrayMinSize,
    IsArray,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
    ValidateNested,
} from 'class-validator';
import { FoodAndDrinkSortDto } from './food-and-drink-sort.dto';
import { FoodAndDrinkRangeDto } from './food-and-drink-range.dto';
import { CoordinatesDto } from './location.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FoodAndDrinkFeaturesEnum } from '../enums/food-and-drink-features.enum';
import { FoodAndDrinkTypeEnum } from '../enums/food-and-drink-type.enum';

export class FoodAndDrinkQueryDto extends BaseQueryDto {
    @ApiProperty({
        example: 'Ресторан Україна',
        description: 'Назва закладу (2-50 символів)',
        required: false,
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        enum: FoodAndDrinkTypeEnum,
        example: 'restaurant',
        description: 'Тип закладу (ресторан, кафе, бар, фаст-фуд тощо)',
        required: false,
    })
    @IsOptional()
    @IsEnum(FoodAndDrinkTypeEnum)
    type?: FoodAndDrinkTypeEnum;

    @ApiPropertyOptional({
        example: 8.5,
        description: 'Мінімальний рейтинг закладу (від 0 до 10)',
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(10)
    rating?: number;

    @ApiPropertyOptional({
        type: 'string',
        example: 'Українська кухня',
        description: 'Фільтр за тегом (3-50 символів)',
    })
    @IsOptional()
    @IsString({
        each: true,
    })
    tag?: string;

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @IsEnum(FoodAndDrinkFeaturesEnum, { each: true })
    features?: FoodAndDrinkFeaturesEnum[];

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
