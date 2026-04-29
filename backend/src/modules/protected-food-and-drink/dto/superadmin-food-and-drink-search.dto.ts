import { FoodAndDrinkSearchDto } from '../../food-and-drink/dto/food-and-drink-search.dto';
import { FoodAndDrinkStatusEnum } from '../../food-and-drink/enums/food-and-drink-status.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class SuperadminFoodAndDrinkSearchDto extends FoodAndDrinkSearchDto {
    @IsOptional()
    @IsEnum(FoodAndDrinkStatusEnum)
    status: FoodAndDrinkStatusEnum;
}
