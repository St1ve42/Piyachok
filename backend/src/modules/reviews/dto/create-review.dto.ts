import {
    IsInt,
    IsNumber,
    IsString,
    IsUUID,
    Max,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator';

export class CreateReviewDto {
    @IsNumber()
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    @MaxLength(500)
    @MinLength(50)
    text: string;

    @IsNumber()
    @Min(1)
    averageReceipt: number;

    @IsString()
    @IsUUID()
    foodAndDrinkId: string;
}
