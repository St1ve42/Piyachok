import { QueryBaseDto } from '../../../shared/dto/query-base.dto';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ReviewSortByEnum } from '../enums/review-sort-by.enum';
import { SortEnum } from '../../../shared/enums/sort.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ReviewQueryDto extends QueryBaseDto {
    @ApiPropertyOptional({
        example: 5,
        description: 'Фільтр за рейтингом (від 1 до 5)',
    })
    @IsOptional()
    @IsNumber()
    rating?: number;

    @ApiPropertyOptional({
        enum: ReviewSortByEnum,
        example: 'createdAt',
        description: 'Поле для сортування',
    })
    @IsOptional()
    @IsEnum(ReviewSortByEnum)
    sortBy?: ReviewSortByEnum;

    @ApiPropertyOptional({
        enum: SortEnum,
        example: 'desc',
        description: 'Напрямок сортування (asc/desc)',
    })
    @IsOptional()
    @IsEnum(SortEnum)
    sort?: SortEnum;
}
