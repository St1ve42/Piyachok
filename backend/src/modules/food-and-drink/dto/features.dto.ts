import { IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FeaturesDto {
    @ApiPropertyOptional({
        example: true,
        description: 'Чи є вай-фай в закладі',
    })
    @IsBoolean()
    @IsOptional()
    isWifi?: boolean;

    @ApiPropertyOptional({
        example: false,
        description: 'Чи є парковка при закладі',
    })
    @IsBoolean()
    @IsOptional()
    isParking?: boolean;

    @ApiPropertyOptional({
        example: true,
        description: 'Чи є живий музичний виступ',
    })
    @IsBoolean()
    @IsOptional()
    isLiveMusic?: boolean;

    @ApiPropertyOptional({
        example: false,
        description: 'Чи працює заклад 24 години на dobу',
    })
    @IsBoolean()
    @IsOptional()
    is24hrs?: boolean;
}
