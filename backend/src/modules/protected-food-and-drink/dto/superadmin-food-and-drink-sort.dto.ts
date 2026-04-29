import { FoodAndDrinkSortDto } from '../../food-and-drink/dto/food-and-drink-sort.dto';
import { IsIn, IsOptional } from 'class-validator';

export class SuperadminFoodAndDrinkSortDto extends FoodAndDrinkSortDto {
    @IsOptional()
    @IsIn(['asc', 'desc'])
    updatedAt?: 'asc' | 'desc';
}
