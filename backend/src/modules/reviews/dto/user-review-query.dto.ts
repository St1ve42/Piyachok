import { ReviewQueryDto } from './review-query-dto';
import { IsOptional, IsString } from 'class-validator';

export class UserReviewQueryDto extends ReviewQueryDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    text?: string;
}
