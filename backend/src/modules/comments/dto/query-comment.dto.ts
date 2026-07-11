import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { SortByCommentEnum } from '../enums/sort-by-comment.enum';
import { SortEnum } from '../../../shared/enums/sort.enum';
import { QueryBaseDto } from '../../../shared/dto/query-base.dto';

export class QueryCommentDto extends QueryBaseDto {
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
