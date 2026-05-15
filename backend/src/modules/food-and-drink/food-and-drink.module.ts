import { forwardRef, Module } from '@nestjs/common';
import { FoodAndDrinkService } from './food-and-drink.service';
import { FoodAndDrinkController } from './food-and-drink.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodAndDrink } from './entities/food-and-drink.entity';
import { FoodAndDrinkStatistic } from '../food-and-drink-statistics/entities/food-and-drink-statistic.entity';
import { FoodAndDrinkViewsPerDay } from '../food-and-drink-statistics/entities/food-and-drink-views-per-day.entity';
import { UserView } from '../food-and-drink-statistics/entities/user-views.entity';
import { TagsModule } from '../tags/tags.module';
import { StorageModule } from '../storage/storage.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FoodAndDrink,
            FoodAndDrinkStatistic,
            FoodAndDrinkViewsPerDay,
            UserView,
        ]),
        forwardRef(() => TagsModule),
        StorageModule,
    ],
    controllers: [FoodAndDrinkController],
    providers: [FoodAndDrinkService],
    exports: [FoodAndDrinkService],
})
export class FoodAndDrinkModule {}
