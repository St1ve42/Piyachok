import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodAndDrinkDto } from './create-food-and-drink.dto';

export class UpdateFoodAndDrinkDto extends PartialType(CreateFoodAndDrinkDto) {}
