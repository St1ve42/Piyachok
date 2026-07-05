import { FoodAndDrinkFavouritesService } from './food-and-drink-favourites.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favourite } from './entity/favourite.entity';
import { FoodAndDrinkStatistic } from '../food-and-drink-statistics/entities/food-and-drink-statistic.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Favourite, FoodAndDrinkStatistic])],
    controllers: [],
    providers: [FoodAndDrinkFavouritesService],
    exports: [FoodAndDrinkFavouritesService],
})
export class FoodAndDrinkFavouritesModule {}
