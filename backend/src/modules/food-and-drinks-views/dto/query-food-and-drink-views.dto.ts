import { IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryDto } from '../../../shared/dto/base-query.dto';

export class QueryFoodAndDrinkViewsDto extends BaseQueryDto {
    @ApiProperty({ example: '2026-07-12', type: 'string' })
    @IsDate()
    @IsOptional()
    start?: Date;

    @ApiProperty({ example: '2026-07-18', type: 'string' })
    @IsDate()
    @IsOptional()
    end?: Date;
}
