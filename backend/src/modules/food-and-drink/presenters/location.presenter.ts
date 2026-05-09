import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CoordinatesPresenter {
    @ApiProperty({
        example: 50.4501,
        description: 'Широта (latitude) (-90 до 90)',
    })
    @Expose()
    lat: number;

    @ApiProperty({
        example: 30.5234,
        description: 'Довгота (longitude) (-180 до 180)',
    })
    @Expose()
    lng: number;
}

export class LocationPresenter {
    @ApiProperty({
        example: 'вул. Хрещатик, 1, Київ',
        description: 'Адреса розташування закладу (5-100 символів)',
    })
    @Expose()
    street: string;

    @ApiPropertyOptional({
        example: {
            lat: 50.4501,
            lng: 30.5234,
        },
        description: 'Географічні координати закладу (широта і довгота)',
    })
    @Expose()
    coordinates?: CoordinatesPresenter;
}
