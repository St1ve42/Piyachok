import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ReviewQueryDto } from '../../reviews/dto/review-query-dto';

export class SuperadminReviewsQuery extends ReviewQueryDto {
    @ApiPropertyOptional({
        example: 'Чудовий заклад',
        description: 'Фільтр за текстом відгуку',
    })
    @IsOptional()
    @IsString()
    @IsOptional()
    text?: string;

    @ApiPropertyOptional({
        example: 'Ресторан Україна',
        description: 'Фільтр за назвою закладу',
    })
    @IsOptional()
    @IsString()
    foodAndDrinkName?: string;

    @ApiPropertyOptional({
        example: 'Ресторан Україна',
        description: 'Фільтр за назвою закладу',
    })
    @IsOptional()
    @IsString()
    userName?: string;
}
