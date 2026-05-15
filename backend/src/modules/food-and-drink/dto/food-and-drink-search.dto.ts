import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { UpdateFoodAndDrinkDto } from './update-food-and-drink.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FoodAndDrinkSearchDto extends PickType(UpdateFoodAndDrinkDto, [
    'type',
]) {
    @ApiProperty({
        example: 'Ресторан Україна',
        description: 'Назва закладу (2-50 символів)',
    })
    @IsString()
    name: string;

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
        description: 'Фільтр за тегами (3-50 символів)',
    })
    @IsOptional()
    @IsString({
        each: true,
    })
    tag?: string;
}
