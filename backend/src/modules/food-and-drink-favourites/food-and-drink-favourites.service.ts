import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Favourite } from './entity/favourite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodAndDrink } from '../food-and-drink/entities/food-and-drink.entity';
import { QueryBaseDto } from '../../shared/dto/query-base.dto';
import { FoodAndDrinkStatistic } from '../food-and-drink-statistics/entities/food-and-drink-statistic.entity';

@Injectable()
export class FoodAndDrinkFavouritesService {
    constructor(
        @InjectRepository(Favourite)
        private readonly favouriteRepository: Repository<Favourite>,
        @InjectRepository(FoodAndDrinkStatistic)
        private readonly foodAndDrinkStatisticsRepository: Repository<FoodAndDrinkStatistic>,
    ) {}

    async toggleFavourite(
        userId: string,
        foodAndDrinkId: string,
    ): Promise<void> {
        const ids = {
            userId,
            foodAndDrinkId,
        };
        const isFavourite = await this.favouriteRepository.existsBy(ids);
        if (isFavourite) {
            await this.favouriteRepository.delete(ids);
            await this.foodAndDrinkStatisticsRepository.decrement(
                { foodAndDrinkId },
                'totalFavourites',
                1,
            );
            return;
        }
        const entity = this.favouriteRepository.create(ids);
        await this.favouriteRepository.save(entity);
        await this.foodAndDrinkStatisticsRepository.increment(
            { foodAndDrinkId },
            'totalFavourites',
            1,
        );
    }

    async checkIfIsFavourite(
        userId: string,
        foodAndDrinkId: string,
    ): Promise<boolean> {
        return await this.favouriteRepository.existsBy({
            userId,
            foodAndDrinkId,
        });
    }

    async findMyFavourites(
        userId: string,
        query: QueryBaseDto,
    ): Promise<{ data: FoodAndDrink[]; total: number; totalPages: number }> {
        const { skip, page, limit } = query;
        const favourites = await this.favouriteRepository.find({
            where: { userId },
            relations: { foodAndDrink: true },
            select: ['id', 'foodAndDrink'],
            take: limit,
            skip: limit * (page - 1) + skip,
        });
        if (favourites.length === 0) {
            throw new NotFoundException('У Вас відсутні уподобання');
        }
        const total = await this.favouriteRepository.countBy({ userId });
        const totalPages = Math.ceil((total - skip) / limit);
        return {
            data: favourites.map((favourite) => favourite.foodAndDrink),
            total,
            totalPages,
            ...query,
        };
    }
}
