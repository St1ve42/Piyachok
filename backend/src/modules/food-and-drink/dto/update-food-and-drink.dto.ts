import { PartialType } from '@nestjs/swagger';
import { CreateFoodAndDrinkDto } from './create-food-and-drink.dto';

export class UpdateFoodAndDrinkDto extends PartialType(CreateFoodAndDrinkDto) {}
