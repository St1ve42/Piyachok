import {
    IsObject,
    IsString,
    MaxLength,
    MinLength,
    ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CoordinatesDto } from './coordinates.dto';

export class LocationDto {
    @ApiProperty({
        example: 'вул. Хрещатик, 1, Київ',
        description: 'Адреса розташування закладу (5-100 символів)',
    })
    @IsString()
    @MinLength(5)
    @MaxLength(100)
    street: string;

    @ApiPropertyOptional({
        description: 'Географічні координати закладу (широта і довгота)',
    })
    @IsObject()
    @ValidateNested()
    coordinates?: CoordinatesDto;
}
