import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { SortByCommentEnum } from '../enums/sort-by-comment.enum';
import { SortEnum } from '../../../shared/enums/sort.enum';
import { QueryBaseDto } from '../../../shared/dto/query-base.dto';

export class QueryCommentDto extends QueryBaseDto {
    @ApiPropertyOptional({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        description: 'Фільтр за текстом коментарю',
    })
    @IsOptional()
    @IsUUID()
    text?: string;

    @ApiPropertyOptional({
        enum: SortByCommentEnum,
        example: 'createdAt',
        description: 'Поле для сортування',
    })
    @IsOptional()
    @IsEnum(SortByCommentEnum)
    sortBy?: SortByCommentEnum;

    @ApiPropertyOptional({
        enum: SortEnum,
        example: 'desc',
        description: 'Напрямок сортування (asc/desc)',
    })
    @IsOptional()
    @IsEnum(SortEnum)
    sort?: SortEnum;
}
