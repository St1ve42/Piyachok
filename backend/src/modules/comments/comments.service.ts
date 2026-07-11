import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    FindOptionsOrder,
    FindOptionsRelations,
    FindOptionsSelect,
    FindOptionsWhere,
    ILike,
    Repository,
} from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { SuperadminQueryCommentDto } from './dto/superadmin-query-comment.dto';
import { User } from '../users/entities/user.entity';
import { isUUID } from 'class-validator';
import { GlobalUserRoleEnum } from '../users/enums/global.user.role.enum';
import { FoodAndDrink } from '../food-and-drink/entities/food-and-drink.entity';
import { QueryCommentDto } from './dto/query-comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        @InjectRepository(FoodAndDrink)
        private readonly foodAndDrinkRepository: Repository<FoodAndDrink>,
    ) {}

    async create(
        createCommentDto: CreateCommentDto,
        userId: string,
    ): Promise<Comment> {
        const { foodAndDrinkId } = createCommentDto;
        const existsFoodAndDrink = await this.foodAndDrinkRepository.existsBy({
            id: foodAndDrinkId,
        });
        if (!existsFoodAndDrink) {
            throw new NotFoundException(
                `Закладу з id ${foodAndDrinkId} не знайдено`,
            );
        }
        const comment = this.commentRepository.create({
            ...createCommentDto,
            userId,
        });
        await this.commentRepository.save(comment);
        return (await this.commentRepository.findOneBy({
            id: comment.id,
        })) as Comment;
    }

    async find(
        query: SuperadminQueryCommentDto | QueryCommentDto,
        additionalFilter: FindOptionsWhere<Comment> = {},
    ): Promise<{ data: Comment[]; total: number; totalPages: number }> {
        const { limit, page, skip, sort, sortBy, ...search } = query;
        const filter: FindOptionsWhere<Comment> = additionalFilter;
        const order: FindOptionsOrder<Comment> = { createdAt: 'desc' };
        const select: FindOptionsSelect<Comment> = {
            id: true,
            text: true,
            createdAt: true,
            updatedAt: true,
            foodAndDrink: {
                id: true,
                name: true,
            },
            user: {
                id: true,
                name: true,
                surname: true,
                photo: true,
            },
        };
        const relations: FindOptionsRelations<Comment> = {
            user: true,
            foodAndDrink: true,
        };
        if (Object.values(additionalFilter).length > 0) {
            const { userId, foodAndDrinkId } = additionalFilter;
            if (userId) {
                delete select['user'];
                delete relations['user'];
            }
            if (foodAndDrinkId) {
                delete select['foodAndDrink'];
                delete relations['foodAndDrink'];
            }
        }
        const searchEntries = Object.entries(search) as [
            keyof SuperadminQueryCommentDto,
            SuperadminQueryCommentDto[keyof SuperadminQueryCommentDto],
        ][];
        if (searchEntries.length > 0) {
            searchEntries.forEach(([searchBy, search]) => {
                if (search) {
                    switch (typeof search) {
                        case 'string':
                            if (searchBy === 'userName') {
                                filter['user'] = { name: ILike(`%${search}%`) };
                            } else if (searchBy === 'foodAndDrinkName') {
                                filter['foodAndDrink'] = {
                                    name: ILike(`%${search}%`),
                                };
                            } else {
                                filter[searchBy] = ILike(`%${search}%`);
                            }
                            break;
                        default:
                            filter[searchBy] = search;
                            break;
                    }
                }
            });
        }
        if (sortBy && sort) {
            order[sortBy] = sort;
        }
        const [data, total] = await this.commentRepository.findAndCount({
            where: filter,
            take: limit,
            skip: (page - 1) * limit + skip,
            relations,
            select,
            order,
            relationLoadStrategy: 'query',
        });
        const totalPages = Math.ceil((total - skip) / limit);
        return { data, total, totalPages, ...query };
    }

    async findById(id: string): Promise<Comment | null> {
        return await this.commentRepository.findOneBy({ id });
    }

    async updateById(
        id: string,
        updateCommentDto: UpdateCommentDto,
    ): Promise<void> {
        await this.commentRepository.update(id, updateCommentDto);
    }

    async remove(id: string): Promise<void> {
        await this.commentRepository.delete(id);
    }

    async hasPermission(id: string, user: User): Promise<boolean> {
        if (!isUUID(id)) {
            throw new BadRequestException(
                `Id ${id} не є коректним. Воно має бути формату uuid (наприклад, e2fecad4-8ca7-4a76-8354-8331309df863)`,
            );
        }
        const comment = await this.commentRepository.findOne({
            where: { id },
            select: ['userId'],
        });
        if (!comment) {
            throw new NotFoundException(`Коментар з id ${id} не знайдено`);
        }
        return (
            comment.userId === user.id ||
            (user.role.name as GlobalUserRoleEnum) ===
                GlobalUserRoleEnum.SUPERADMIN
        );
    }
}
