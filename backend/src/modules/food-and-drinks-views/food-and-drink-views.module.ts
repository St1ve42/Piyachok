import { Module } from '@nestjs/common';
import { FoodAndDrinkViewsService } from './food-and-drink-views.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodAndDrinkViewsPerDay } from './entity/food-and-drink-views-per-day.entity';
import { UserView } from './entity/user-views.entity';
import { FoodAndDrink } from '../food-and-drink/entities/food-and-drink.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FoodAndDrinkViewsPerDay,
            UserView,
            FoodAndDrink,
        ]),
    ],
    controllers: [],
    providers: [FoodAndDrinkViewsService],
    exports: [FoodAndDrinkViewsService],
})
export class FoodAndDrinkViewsModule {}
