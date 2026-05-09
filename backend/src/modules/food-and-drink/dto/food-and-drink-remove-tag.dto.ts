import {
    ArrayNotEmpty,
    IsArray,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FoodAndDrinkRemoveTagDto {
    @ApiProperty({
        type: 'array',
        example: ['Українська кухня', 'Вегетаріанське меню'],
        description: 'Масив тегів для видалення (3-50 символів кожен)',
    })
    @IsArray()
    @ArrayNotEmpty()
    @IsString({
        each: true,
    })
    @MinLength(3, {
        each: true,
    })
    @MaxLength(50, {
        each: true,
    })
    tags: string[];
}
