import { IsNumber, IsOptional, Max, Min, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SuperadminFoodAndDrinkUpdateDto {
    @ApiProperty({ example: '3.2' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    @ValidateIf((_, value) => value !== null)
    customRating: number;
}
