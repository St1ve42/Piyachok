import { IsOptional, IsString } from 'class-validator';
import { QueryBaseDto } from '../../../shared/dto/query-base.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryFoodAndDrinkTopCategoryDto extends QueryBaseDto {
    @ApiPropertyOptional({
        example: 'Сніданки',
        description: 'Назва категорії для фільтрації',
        required: false,
    })
    @IsOptional()
    @IsString()
    name?: string;
}
