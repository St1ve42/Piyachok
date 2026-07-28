import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodAndDrinkCategoryService } from './food-and-drink-category.service';
import { FoodAndDrinkTopCategoryController } from './food-and-drink-top-category.controller';
import { FoodAndDrinkTopCategory } from './entities/food-and-drink-top-category.entity';
import { FoodAndDrink } from '../food-and-drink/entities/food-and-drink.entity';
import { FoodAndDrinkModule } from '../food-and-drink/food-and-drink.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([FoodAndDrinkTopCategory, FoodAndDrink]),
        FoodAndDrinkModule,
    ],
    controllers: [FoodAndDrinkTopCategoryController],
    providers: [FoodAndDrinkCategoryService],
})
export class FoodAndDrinkCategoryModule {}
