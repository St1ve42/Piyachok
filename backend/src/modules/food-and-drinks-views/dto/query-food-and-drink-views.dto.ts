import { IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { QueryBaseDto } from '../../../shared/dto/query-base.dto';

export class QueryFoodAndDrinkViewsDto extends QueryBaseDto {
    @ApiProperty({ example: '2026-07-12', type: 'string' })
    @IsDate()
    @IsOptional()
    start?: Date;

    @ApiProperty({ example: '2026-07-18', type: 'string' })
    @IsDate()
    @IsOptional()
    end?: Date;
}
