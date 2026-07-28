import { CreateFoodAndDrinkTopCategoryDto } from './create-food-and-drink-top-category.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateFoodAndDrinkTopCategoryDto extends PartialType(
    CreateFoodAndDrinkTopCategoryDto,
) {}
