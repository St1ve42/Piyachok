import { Module } from '@nestjs/common';
import { FoodAndDrinkStatisticsService } from './food-and-drink-statistics.service';

@Module({
    controllers: [],
    providers: [FoodAndDrinkStatisticsService],
})
export class FoodAndDrinkStatisticsModule {}
