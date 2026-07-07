import { Module } from '@nestjs/common';
import { SuperadminFoodAndDrinkController } from './superadmin-food-and-drink.controller';
import { FoodAndDrinkModule } from '../food-and-drink/food-and-drink.module';

@Module({
    imports: [FoodAndDrinkModule],
    controllers: [SuperadminFoodAndDrinkController],
    providers: [],
})
export class SuperadminFoodAndDrinkModule {}
