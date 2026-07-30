import { Injectable } from '@nestjs/common';
import { SuperadminReviewsQuery } from './dto/superadmin-reviews-query';
import { Review } from '../reviews/entities/review.entity';
import {
    FindOptionsOrder,
    FindOptionsSelect,
    FindOptionsWhere,
    Like,
    Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class SuperadminReviewsService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
    ) {}

    async find(
        query: SuperadminReviewsQuery,
    ): Promise<{ data: Review[]; total: number; totalPages: number }> {
        const { page, limit, skip, sortBy, sort, ...search } = query;
        const entries = Object.entries(search);
        const filter: FindOptionsWhere<Review> = {};
        const order: FindOptionsOrder<Review> = { rating: 'DESC' };
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
        if (sortBy && sort) {
            delete order['rating'];
            order[sortBy] = sort;
        }
        const select: FindOptionsSelect<Review> = {
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
            user: {
                id: true,
                name: true,
                surname: true,
                email: true,
                photo: true,
            },
        };
        const [data, total] = await this.reviewRepository.findAndCount({
            where: filter,
            order,
            take: limit,
            skip: UtilsService.calculateSkipRecords(page, limit, skip),
            select,
            relations: { foodAndDrink: true, user: true },
            relationLoadStrategy: 'query',
        });
        const totalPages = Math.ceil((total - skip) / limit);
        return { data, total, totalPages, ...query };
    }
}
