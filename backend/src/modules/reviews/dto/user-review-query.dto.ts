import { ReviewQueryDto } from './review-query-dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserReviewQueryDto extends ReviewQueryDto {
    @ApiPropertyOptional({
        example: 'Ресторан Україна',
        description: 'Фільтр за назвою закладу',
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({
        example: "Чудовий заклад з вишуканим інтер'єром",
        description: 'Фільтр за текстом відгуку',
    })
    @IsOptional()
    @IsString()
    text?: string;
}
