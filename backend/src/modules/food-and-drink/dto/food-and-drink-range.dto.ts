import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class RangeDto {
    @ApiPropertyOptional({
        example: 150,
        description: 'Більше або рівно (gte)',
    })
    @IsOptional()
    @IsNumber()
    gte?: number;

    @ApiPropertyOptional({
        example: 450,
        description: 'Менше або рівно (lte)',
    })
    @IsOptional()
    @IsNumber()
    lte?: number;
}
