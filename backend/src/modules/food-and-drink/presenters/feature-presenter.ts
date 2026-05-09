import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FeaturePresenter {
    @ApiProperty({
        example: true,
        description: 'Чи є вай-фай в закладі',
    })
    @Expose()
    isWifi: boolean | null;

    @ApiProperty({
        example: false,
        description: 'Чи є парковка при закладі',
    })
    @Expose()
    isParking: boolean | null;

    @ApiProperty({
        example: true,
        description: 'Чи є живий музичний виступ',
    })
    @Expose()
    isLiveMusic: boolean | null;

    @ApiProperty({
        example: false,
        description: 'Чи працює заклад 24 години на добу',
    })
    @Expose()
    is24hrs: boolean | null;
}
