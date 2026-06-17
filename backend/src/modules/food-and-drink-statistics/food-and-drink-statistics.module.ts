import { Module } from '@nestjs/common';
import { FoodAndDrinkStatisticsService } from './food-and-drink-statistics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodAndDrinkStatistic } from './entities/food-and-drink-statistic.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FoodAndDrinkStatistic])],
    controllers: [],
    providers: [FoodAndDrinkStatisticsService],
    exports: [FoodAndDrinkStatisticsService],
})
export class FoodAndDrinkStatisticsModule {}
