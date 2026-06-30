import { BaseQueryDto } from '../../../shared/dto/base-query.dto';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class SuperadminReviewsQuery extends BaseQueryDto {
    @IsString()
    @IsUUID()
    @IsOptional()
    userId?: string;

    @IsString()
    @IsUUID()
    @IsOptional()
    foodAndDrinkId?: string;

    @IsOptional()
    @IsString()
    @IsOptional()
    text?: string;

    @IsOptional()
    @IsNumber()
    rating?: number;
}
