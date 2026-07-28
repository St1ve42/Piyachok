import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFoodAndDrinkTopCategoryDto {
    @ApiProperty({
        example: 'Сніданки',
        description: 'Назва категорії (2-100 символів)',
    })
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string;
}
