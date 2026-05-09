import { PickType } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator';
import { UpdateFoodAndDrinkDto } from './update-food-and-drink.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FoodAndDrinkSearchDto extends PickType(UpdateFoodAndDrinkDto, [
    'name',
    'type',
]) {
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
        example: true,
        description: 'Фільтр за наявністю вай-фай',
    })
    @IsOptional()
    @IsBoolean()
    isWifi?: boolean;

    @ApiPropertyOptional({
        example: false,
        description: 'Фільтр за наявністю парковки',
    })
    @IsOptional()
    @IsBoolean()
    isParking?: boolean;

    @ApiPropertyOptional({
        example: true,
        description: 'Фільтр за наявністю живої музики',
    })
    @IsOptional()
    @IsBoolean()
    isLiveMusic?: boolean;

    @ApiPropertyOptional({
        example: false,
        description: 'Фільтр за режимом роботи 24/7',
    })
    @IsOptional()
    @IsBoolean()
    is24hrs?: boolean;

    @ApiPropertyOptional({
        type: 'string',
        example: 'Українська кухня',
        description: 'Фільтр за тегами (3-50 символів)',
    })
    @IsOptional()
    @IsString({
        each: true,
    })
    @MinLength(3, {
        each: true,
    })
    @MaxLength(50, {
        each: true,
    })
    tag?: string;
}
