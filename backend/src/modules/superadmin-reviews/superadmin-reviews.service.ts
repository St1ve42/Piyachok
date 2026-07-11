import { Injectable } from '@nestjs/common';
import { SuperadminReviewsQuery } from './dto/superadmin-reviews-query';
import { Review } from '../reviews/entities/review.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SuperadminReviewsService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
    ) {}

    async find(
        query: SuperadminReviewsQuery,
    ): Promise<{ data: Review[]; total: number; totalPages: number }> {
        const { page, limit, skip, ...search } = query;
        const entries = Object.entries(search);
        const filter: FindOptionsWhere<Review> = {};
        if (entries.length > 0) {
            entries.forEach(([filterKey, filterValue]) => {
                if (filterValue) {
                    const likeValue = Like(`%${filterValue}%`);
                    switch (typeof filterValue) {
                        case 'string':
                            if (filterKey === 'foodAndDrinkName') {
                                filter['foodAndDrink'] = {
                                    name: likeValue,
                                };
                            } else if (filterKey === 'userName') {
                                filter['user'] = {
                                    name: likeValue,
                                };
                            } else {
                                filter[filterKey] = likeValue;
                            }
                            break;
                        case 'number':
                            filter[filterKey] = filterValue;
                            break;
                    }
                }
            });
        }
        const select: string[] = [
            'review.id',
            'review.rating',
            'review.text',
            'review.averageReceipt',
            'review.createdAt',
            'foodAndDrink.id',
            'foodAndDrink.name',
            'foodAndDrink.type',
            'foodAndDrink.mainImage',
            'user.id',
            'user.name',
            'user.surname',
            'user.email',
            'user.photo',
        ];
        const [data, total] = await this.reviewRepository
            .createQueryBuilder('review')
            .innerJoin('review.user', 'user')
            .innerJoin('review.foodAndDrink', 'foodAndDrink')
            .select(select)
            .take(limit)
            .skip((page - 1) * limit + skip)
            .where(filter)
            .getManyAndCount();
        const totalPages = Math.ceil((total - skip) / limit);
        return { data, total, totalPages, ...query };
    }
}
