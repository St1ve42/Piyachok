import { QueryBaseDto } from '../../../shared/dto/query-base.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SuperadminReviewsQuery extends QueryBaseDto {
    @ApiPropertyOptional({
        example: 'Чудовий заклад',
        description: 'Фільтр за текстом відгуку',
    })
    @IsOptional()
    @IsString()
    @IsOptional()
    text?: string;

    @ApiPropertyOptional({
        example: 5,
        description: 'Фільтр за рейтингом',
    })
    @IsOptional()
    @IsNumber()
    rating?: number;

    @ApiPropertyOptional({
        example: 'Ресторан Україна',
        description: 'Фільтр за назвою закладу',
    })
    @IsOptional()
    @IsString()
    name?: string;
}
