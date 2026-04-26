import { IsNumber, IsOptional, ValidateNested } from 'class-validator';

class RangeDto {
    @IsOptional()
    @IsNumber()
    gt?: number;

    @IsOptional()
    @IsNumber()
    gte?: number;

    @IsOptional()
    @IsNumber()
    lt?: number;

    @IsOptional()
    @IsNumber()
    lte?: number;
}

export class FoodAndDrinkRangeDto {
    @IsOptional()
    @ValidateNested()
    averageReceipt?: RangeDto;
}
