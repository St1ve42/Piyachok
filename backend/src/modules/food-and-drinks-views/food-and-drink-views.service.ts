import {
    BadRequestException,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodAndDrinkViewsPerDay } from './entity/food-and-drink-views-per-day.entity';
import { Repository } from 'typeorm';
import { UserView } from './entity/user-views.entity';
import { ResponseFoodAndDrinkFindViewsDto } from './dto/response-food-and-drink-find-views.dto';
import { QueryFoodAndDrinkViewsDto } from './dto/query-food-and-drink-views.dto';
import { UtilsService } from '../utils/utils.service';
import { FoodAndDrink } from '../food-and-drink/entities/food-and-drink.entity';
import { FoodAndDrinkStatusEnum } from '../food-and-drink/enums/food-and-drink-status.enum';
import { GlobalUserRoleEnum } from '../users/enums/global.user.role.enum';

@Injectable()
export class FoodAndDrinkViewsService {
    constructor(
        @InjectRepository(FoodAndDrink)
        private readonly foodAndDrinkRepository: Repository<FoodAndDrink>,
        @InjectRepository(FoodAndDrinkViewsPerDay)
        private readonly foodAndDrinkViewPerDayRepository: Repository<FoodAndDrinkViewsPerDay>,
        @InjectRepository(UserView)
        private readonly userViewsRepository: Repository<UserView>,
    ) {}

    async upsertViewPerDay(foodAndDrinkId: string): Promise<void> {
        const now = new Date();
        const viewDate = new Date(
            Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
        );
        const foodAndDrinkViewsPerDay =
            await this.foodAndDrinkViewPerDayRepository.existsBy({
                foodAndDrinkId,
                viewDate,
            });
        if (foodAndDrinkViewsPerDay) {
            await this.foodAndDrinkViewPerDayRepository.increment(
                {
                    foodAndDrinkId,
                    viewDate,
                },
                'viewsPerDay',
                1,
            );
            return;
        }
        const entity = this.foodAndDrinkViewPerDayRepository.create({
            foodAndDrinkId,
            viewDate,
            viewsPerDay: 1,
        });
        await this.foodAndDrinkViewPerDayRepository.save(entity);
    }

    async createViewUser(
        userId: string,
        foodAndDrinkId: string,
    ): Promise<void> {
        const entity = this.userViewsRepository.create({
            userId,
            foodAndDrinkId,
        });
        await this.userViewsRepository.save(entity);
    }

    async existsUserView(
        userId: string,
        foodAndDrinkId: string,
    ): Promise<boolean> {
        return await this.userViewsRepository.existsBy({
            userId,
            foodAndDrinkId,
        });
    }

    async findViews(
        foodAndDrinkId: string,
        role: GlobalUserRoleEnum,
        query: QueryFoodAndDrinkViewsDto,
    ): Promise<ResponseFoodAndDrinkFindViewsDto> {
        const existsFoodAndDrink = await this.foodAndDrinkRepository.existsBy({
            id: foodAndDrinkId,
            status: FoodAndDrinkStatusEnum.ACTIVE,
        });
        if (!existsFoodAndDrink && role !== GlobalUserRoleEnum.SUPERADMIN) {
            throw new ForbiddenException(
                'Ви не можете переглядати статистику закладу, до поки модерація його не одобрить',
            );
        }
        let { start, end } = query;
        if (start && end && start > end) {
            throw new BadRequestException(
                'Кінцева дата має бути більшою, ніж початкова',
            );
        }
        if (start && end && UtilsService.diffInUnit(start, end, 'days') > 31) {
            throw new BadRequestException('Проміжок має бути менше 31 дня');
        }
        if (start && end) {
            const offset = -start.getTimezoneOffset() / 60;
            start = UtilsService.addTime(start, offset, 'hours');
            end = UtilsService.addTime(end, offset, 'hours');
        } else {
            const now = new Date();
            end = new Date(
                Date.UTC(
                    now.getUTCFullYear(),
                    now.getUTCMonth(),
                    now.getUTCDate(),
                ),
            );
            start = UtilsService.subtractTime(end, 1, 'week');
        }
        const views: number[] = [];
        const dates: string[] = [];
        const diff = UtilsService.diffInUnit(start, end, 'days');
        let viewDate = start;
        for (let i = 0; i <= diff; i++) {
            const viewPerDayRecord =
                await this.foodAndDrinkViewPerDayRepository.findOne({
                    where: { foodAndDrinkId, viewDate },
                    select: ['viewsPerDay'],
                });
            if (!viewPerDayRecord) {
                views.push(0);
                dates.push(viewDate.toLocaleDateString());
            } else {
                views.push(viewPerDayRecord.viewsPerDay);
                dates.push(viewDate.toLocaleDateString());
            }
            viewDate = UtilsService.addTime(viewDate, 1, 'day');
        }
        return { views, dates };
    }
}
