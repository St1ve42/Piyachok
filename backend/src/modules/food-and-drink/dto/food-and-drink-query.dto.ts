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
import { RangeDto } from './food-and-drink-range.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FoodAndDrinkFeaturesEnum } from '../enums/food-and-drink-features.enum';
import { FoodAndDrinkTypeEnum } from '../enums/food-and-drink-type.enum';
import { FoodAndDrinkSortByEnum } from '../enums/food-and-drink-sort-by.enum';
import { SortEnum } from '../../../shared/enums/sort.enum';

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
        description: 'Напрям сортування: за зростанням або спаданням',
        example: SortEnum.ASC,
        enum: SortEnum,
    })
    @IsOptional()
    @IsEnum(SortEnum)
    sort?: SortEnum;

    @ApiPropertyOptional({
        description: 'Сортування за ознакою',
        example: FoodAndDrinkSortByEnum.DISTANCE,
        enum: FoodAndDrinkSortByEnum,
    })
    @IsOptional()
    @IsEnum(FoodAndDrinkSortByEnum)
    sortBy?: FoodAndDrinkSortByEnum;

    @ApiPropertyOptional({
        example: {
            gte: 150,
            lte: 500,
        },
        description: 'Діапазон фільтрації за середньою вартістю меню',
    })
    @IsOptional()
    @ValidateNested()
    averageReceipt?: RangeDto;

    @ApiProperty({
        example: 50.4501,
        description: 'Широта користувача (latitude) (-90 до 90)',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @Min(-90)
    @Max(90)
    lat?: number;

    @ApiProperty({
        example: 30.5234,
        description: 'Довгота користувача(longitude) (-180 до 180)',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @Min(-180)
    @Max(180)
    lng?: number;
}
