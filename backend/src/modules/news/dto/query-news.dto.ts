import { IsEnum, IsOptional } from 'class-validator';
import { NewsCategoryEnum } from '../enums/news-category.enum';
import { QueryBaseDto } from '../../../shared/dto/query-base.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryNewsDto extends QueryBaseDto {
    @ApiPropertyOptional({
        example: 'general',
        enum: NewsCategoryEnum,
        description: 'Категорія новини',
        required: false,
    })
    @IsOptional()
    @IsEnum(NewsCategoryEnum)
    category?: NewsCategoryEnum;

    @ApiPropertyOptional({
        example: 'Знижки -50% на всі види м`яса',
        required: false,
    })
    @IsOptional()
    title?: string;
}
