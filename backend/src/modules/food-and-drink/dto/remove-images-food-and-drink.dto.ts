import {
    ArrayMinSize,
    ArrayNotEmpty,
    IsArray,
    IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveImagesFoodAndDrinkDto {
    @ApiProperty({
        type: 'array',
        example: [
            'uploads/restaurant-1.jpg',
            'uploads/restaurant-2.jpg',
            'uploads/restaurant-3.jpg',
        ],
    })
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsString({ each: true })
    images: string[];
}
