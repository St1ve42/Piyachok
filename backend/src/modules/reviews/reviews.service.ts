import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { FindOptionsOrder, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { User } from '../users/entities/user.entity';
import { GlobalUserRoleEnum } from '../users/enums/global.user.role.enum';
import { ReviewComplaintDto } from './dto/review-complaint.dto';
import { ReviewStatisticsPresenter } from './presenter/ReviewStatisticsPresenter';
import { FoodAndDrink } from '../food-and-drink/entities/food-and-drink.entity';
import { ReviewQueryDto } from './dto/review-query-dto';
import { UserReviewQueryDto } from './dto/user-review-query.dto';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
        @InjectRepository(FoodAndDrink)
        private readonly foodAndDrinkRepository: Repository<FoodAndDrink>,
    ) {}

    async create(
        createReviewDto: CreateReviewDto,
        userId: string,
    ): Promise<Review> {
        const { foodAndDrinkId } = createReviewDto;
        const exists = await this.reviewRepository.existsBy({
            userId,
            foodAndDrinkId,
        });
        if (exists) {
            throw new ConflictException(
                'Ви не можете залишати більше, ніж один відгук для цього закладу',
            );
        }
        const review = this.reviewRepository.create({
            ...createReviewDto,
            userId,
        });
        const savedReview = await this.reviewRepository.save(review);
        await this.setAverageRating(foodAndDrinkId);
        return savedReview;
    }

    async delete(id: string): Promise<void> {
        const { foodAndDrinkId } = (await this.reviewRepository.findOne({
            where: { id },
            select: ['foodAndDrinkId'],
        })) as Review;
        await this.reviewRepository.delete(id);
        await this.setAverageRating(foodAndDrinkId);
    }

    async isExistsById(id: string): Promise<boolean> {
        return this.reviewRepository.existsBy({ id });
    }

    async hasPermission(id: string, user: User): Promise<boolean> {
        const { id: userId, role } = user;
        if (!isUUID(id)) {
            throw new BadRequestException(
                `Id ${id} не є коректним. Воно має бути формату uuid (наприклад, e2fecad4-8ca7-4a76-8354-8331309df863)`,
            );
        }
        const review = await this.reviewRepository.findOneBy({
            id,
        });
        if (!review) {
            throw new NotFoundException(`Відгук з id ${id} не знайдено`);
        }
        return (
            review.userId === userId ||
            (role.name as GlobalUserRoleEnum) === GlobalUserRoleEnum.SUPERADMIN
        );
    }

    async getFoodAndDrinkReviews(
        foodAndDrinkId: string,
        query: ReviewQueryDto,
    ): Promise<{ data: Review[]; total: number; totalPages: number }> {
        const { limit, page, skip, sort, sortBy, ...search } = query;
        const filter: FindOptionsWhere<Review> = { foodAndDrinkId };
        const order: FindOptionsOrder<Review> = {};
        const searchEntries = Object.entries(search);
        if (searchEntries.length > 0) {
            searchEntries.map(([key, value]) => {
                if (value) {
                    switch (typeof value) {
                        case 'number':
                            filter[key] = value;
                    }
                }
            });
        }
        if (sortBy && sort) {
            order[sortBy] = sort;
        }
        const [data, total] = await this.reviewRepository.findAndCount({
            where: filter,
            take: limit,
            skip: (page - 1) * limit + skip,
            relations: { user: true },
            select: {
                id: true,
                rating: true,
                text: true,
                averageReceipt: true,
                createdAt: true,
                user: {
                    id: true,
                    name: true,
                    surname: true,
                    photo: true,
                },
            },
            order,
            relationLoadStrategy: 'query',
        });
        const totalPages = Math.ceil((total - skip) / limit);
        return { data, total, totalPages, ...query };
    }

    async getReviewStatistics(
        foodAndDrinkId: string,
    ): Promise<{ data: ReviewStatisticsPresenter[]; total: number }> {
        const ratings = [5, 4, 3, 2, 1];
        const filter: FindOptionsWhere<Review> = { foodAndDrinkId };
        const exists = await this.reviewRepository.existsBy(filter);
        if (!exists) {
            return {
                data: ratings.map((rating) => {
                    return { rating, count: 0 };
                }),
                total: 0,
            };
        }
        const reviewStatistics: { rating: number; count: number }[] = [];
        for (const rating of ratings) {
            const count = await this.reviewRepository.countBy({
                rating,
                ...filter,
            });
            reviewStatistics.push({ rating, count });
        }
        const total = await this.reviewRepository.countBy(filter);
        return { data: reviewStatistics, total };
    }

    async sendComplaint(
        reviewComplaintDto: ReviewComplaintDto,
        id: string,
        user: User,
    ): Promise<void> {
        const { reason } = reviewComplaintDto;
        const { name, surname } = user;
        const exists = await this.reviewRepository.existsBy({
            id,
            userId: user.id,
        });
        if (exists) {
            throw new ForbiddenException(
                'Ви не можете надсилати скаргу на свій же відгук',
            );
        }
        const { foodAndDrinkName, creatorName, creatorSurname, text } =
            (await this.reviewRepository
                .createQueryBuilder('review')
                .innerJoin('review.foodAndDrink', 'foodAndDrink')
                .innerJoin('review.user', 'user')
                .where('review.id = :id', { id })
                .select([
                    'review.id AS id',
                    'text',
                    'foodAndDrink.name AS foodAndDrinkName',
                    'user.name AS creatorName',
                    'user.surname AS creatorSurname',
                ])
                .getRawOne()) as {
                id: string;
                foodAndDrinkName: string;
                creatorName: string;
                creatorSurname: string;
                text: string;
            };
        console.log(
            `Користувач ${name} ${surname} надіслав скаргу: 
             Заклад: "${foodAndDrinkName}";
             Автор відгуку: ${creatorName} ${creatorSurname}
             Текст відгуку: "${text}"; 
             Причина: "${reason}"`,
        );
    }

    async findMyReviews(
        userId: string,
        query: UserReviewQueryDto,
    ): Promise<{ data: Review[]; total: number; totalPages: number }> {
        const { skip, page, limit, sortBy, sort, ...search } = query;
        const filter: FindOptionsWhere<Review> = { userId };
        const order: FindOptionsOrder<Review> = {};
        const searchEntries = Object.entries(search);
        if (searchEntries.length > 0) {
            searchEntries.map(([key, value]) => {
                if (value) {
                    switch (typeof value) {
                        case 'number':
                            filter[key] = value;
                            break;
                        case 'string':
                            if (key === 'name') {
                                filter['foodAndDrink'] = {
                                    name: ILike(`%${value}%`),
                                };
                            } else {
                                filter[key] = ILike(`%${value}%`);
                            }
                            break;
                    }
                }
            });
        }
        if (sortBy && sort) {
            order[sortBy] = sort;
        }
        const reviews = await this.reviewRepository.find({
            where: filter,
            select: {
                id: true,
                rating: true,
                text: true,
                averageReceipt: true,
                createdAt: true,
                foodAndDrink: {
                    id: true,
                    name: true,
                    type: true,
                    mainImage: true,
                },
            },
            relations: { foodAndDrink: true },
            relationLoadStrategy: 'query',
            take: limit,
            skip: limit * (page - 1) + skip,
            order,
        });
        const total = await this.reviewRepository.countBy(filter);
        const totalPages = Math.ceil((total - skip) / limit);
        return {
            data: reviews,
            total,
            totalPages,
            ...query,
        };
    }

    private async setAverageRating(foodAndDrinkId: string): Promise<void> {
        const averageRating = await this.reviewRepository.average('rating', {
            foodAndDrinkId,
        });
        await this.foodAndDrinkRepository.update(foodAndDrinkId, {
            rating: averageRating ? Number(averageRating.toFixed(1)) : 0,
        });
    }
}
