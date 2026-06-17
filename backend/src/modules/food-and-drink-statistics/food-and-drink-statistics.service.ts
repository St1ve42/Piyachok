import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodAndDrinkStatistic } from './entities/food-and-drink-statistic.entity';
import { Repository } from 'typeorm';
import { ResponseFindStatisticByFoodAndDrinkDto } from './dto/response-find-statistic-by-food-and-drink.dto';

@Injectable()
export class FoodAndDrinkStatisticsService {
    constructor(
        @InjectRepository(FoodAndDrinkStatistic)
        private readonly foodAndDrinkStatisticsRepository: Repository<FoodAndDrinkStatistic>,
    ) {}
    async create(foodAndDrinkId: string): Promise<void> {
        const hasStatistics =
            await this.foodAndDrinkStatisticsRepository.existsBy({
                foodAndDrinkId,
            });
        if (hasStatistics) {
            throw new ConflictException('Заклад вже володіє статистикою');
        }
        const statisticsEntity = this.foodAndDrinkStatisticsRepository.create({
            foodAndDrinkId,
        });
        await this.foodAndDrinkStatisticsRepository.save(statisticsEntity);
    }

    async findOneByFoodAndDrink(
        foodAndDrinkId: string,
    ): Promise<ResponseFindStatisticByFoodAndDrinkDto> {
        const statistics = await this.foodAndDrinkStatisticsRepository.findOne({
            where: {
                foodAndDrinkId,
            },
            select: ['totalFavourites', 'totalViews'],
        });
        if (!statistics) {
            throw new ConflictException('У заклада відсутня статистика');
        }
        return statistics;
    }

    async increment(
        foodAndDrinkId: string,
        field: 'totalViews' | 'totalFavourites',
    ): Promise<void> {
        await this.foodAndDrinkStatisticsRepository.increment(
            { foodAndDrinkId },
            field,
            1,
        );
    }
}
