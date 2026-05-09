import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

class RangeDto {
    @ApiPropertyOptional({
        example: 100,
        description: 'Більше ніж (gt)',
    })
    @IsOptional()
    @IsNumber()
    gt?: number;

    @ApiPropertyOptional({
        example: 150,
        description: 'Більше або рівно (gte)',
    })
    @IsOptional()
    @IsNumber()
    gte?: number;

    @ApiPropertyOptional({
        example: 500,
        description: 'Менше ніж (lt)',
    })
    @IsOptional()
    @IsNumber()
    lt?: number;

    @ApiPropertyOptional({
        example: 450,
        description: 'Менше або рівно (lte)',
    })
    @IsOptional()
    @IsNumber()
    lte?: number;
}

export class FoodAndDrinkRangeDto {
    @ApiPropertyOptional({
        example: {
            gte: 150,
            lte: 500,
        },
        description: 'Діапазон фільтрації за середньою вартістю меню',
    })
    @IsOptional()
    @ValidateNested()
    averageReceipt?: RangeDto;
}
