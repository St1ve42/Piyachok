import { Module } from '@nestjs/common';
import { ProtectedFoodAndDrinkController } from './protected-food-and-drink.controller';
import { FoodAndDrinkModule } from '../food-and-drink/food-and-drink.module';

@Module({
    imports: [FoodAndDrinkModule],
    controllers: [ProtectedFoodAndDrinkController],
    providers: [],
})
export class ProtectedFoodAndDrinkModule {}
