import { IsDate, IsOptional } from 'class-validator';

export class QueryFoodAndDrinkViewsDto {
    @IsDate()
    @IsOptional()
    start?: Date;

    @IsDate()
    @IsOptional()
    end?: Date;
}
