import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetCoordinatesDto {
    @ApiProperty({ description: 'Назва регіону', example: 'Київська область' })
    @IsString()
    region: string;

    @ApiProperty({ description: 'Назва міста', example: 'Київ' })
    @IsString()
    city: string;

    @ApiProperty({ description: 'Назва вулиці', example: 'Хрещатик' })
    @IsString()
    @IsOptional()
    street?: string;
}
