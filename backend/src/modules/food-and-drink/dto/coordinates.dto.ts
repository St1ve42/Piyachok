import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class CoordinatesDto {
    @ApiProperty({
        example: 50.4501,
        description: 'Широта (latitude) (-90 до 90)',
    })
    @IsNumber()
    @Min(-90)
    @Max(90)
    lat: number;

    @ApiProperty({
        example: 30.5234,
        description: 'Довгота (longitude) (-180 до 180)',
    })
    @IsNumber()
    @Min(-180)
    @Max(180)
    lng: number;
}