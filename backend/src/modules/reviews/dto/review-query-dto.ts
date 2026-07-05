import { BaseQueryDto } from '../../../shared/dto/base-query.dto';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ReviewSortByEnum } from '../enums/review-sort-by.enum';
import { SortEnum } from '../../../shared/enums/sort.enum';

export class ReviewQueryDto extends BaseQueryDto {
    @IsOptional()
    @IsNumber()
    rating?: number;

    @IsOptional()
    @IsEnum(ReviewSortByEnum)
    sortBy?: ReviewSortByEnum;

    @IsOptional()
    @IsEnum(SortEnum)
    sort?: SortEnum;
}
