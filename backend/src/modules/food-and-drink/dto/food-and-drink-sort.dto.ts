import { IsIn, IsOptional } from 'class-validator';
import { FindOptionsOrder } from 'typeorm';
import { FoodAndDrink } from '../entities/food-and-drink.entity';

const allowedSortValues = ['asc', 'desc'];

export class FoodAndDrinkSortDto implements FindOptionsOrder<FoodAndDrink> {
    @IsOptional()
    @IsIn(allowedSortValues)
    rating?: 'asc' | 'desc';

    @IsOptional()
    @IsIn(allowedSortValues)
    averageReceipt?: 'asc' | 'desc';

    @IsOptional()
    @IsIn(allowedSortValues)
    createdAt?: 'asc' | 'desc';

    @IsOptional()
    @IsIn(allowedSortValues)
    name?: 'asc' | 'desc';
}
