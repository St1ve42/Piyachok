import {
    ForbiddenException,
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
import { News } from './entities/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { QueryNewsDto } from './dto/query-news.dto';
import { FoodAndDrink } from '../food-and-drink/entities/food-and-drink.entity';
import { UtilsService } from '../utils/utils.service';
import { itemNameEnum } from '../storage/enums/itemNameEnum';
import { StorageService } from '../storage/storage.service';
import { IUserRequest } from '../auth/interfaces/IUserRequest';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private readonly newsRepository: Repository<News>,
        @InjectRepository(FoodAndDrink)
        private readonly foodAndDrinkRepository: Repository<FoodAndDrink>,
        private readonly storageService: StorageService,
    ) {}

    async create(createNewsDto: CreateNewsDto, userId: string): Promise<News> {
        const foodAndDrink = await this.foodAndDrinkRepository.findOne({
            where: { ownerId: userId },
            select: ['id'],
        });
        if (!foodAndDrink) {
            throw new ForbiddenException(
                'Новину може створювати лише власник закладу',
            );
        }
        const { id } = foodAndDrink;
        const news = this.newsRepository.create({
            ...createNewsDto,
            foodAndDrinkId: id,
        });
        await this.newsRepository.insert(news);
        const select: FindOptionsSelect<News> = {
            id: true,
            title: true,
            text: true,
            photo: true,
            category: true,
            isPromoted: true,
            createdAt: true,
            foodAndDrink: {
                name: true,
            },
        };
        return (await this.newsRepository.findOne({
            where: { id: news.id },
            select,
        })) as News;
    }

    async find(
        query: QueryNewsDto,
        additionalFilter?: FindOptionsWhere<News>,
    ): Promise<{ data: News[]; total: number; totalPages: number }> {
        const { category, limit, skip, page, title } = query;
        const select: FindOptionsSelect<News> = {
            id: true,
            title: true,
            photo: true,
            category: true,
            isPromoted: true,
            createdAt: true,
            foodAndDrink: {
                id: true,
                name: true,
            },
        };
        const relations: FindOptionsRelations<News> = {
            foodAndDrink: true,
        };
        if (additionalFilter && additionalFilter.foodAndDrinkId) {
            delete select['foodAndDrink'];
            delete relations['foodAndDrink'];
        }
        const filter: FindOptionsWhere<News> = { ...additionalFilter };
        const order: FindOptionsOrder<News> = {
            createdAt: 'desc',
        };

        if (category) {
            filter.category = category;
        }
        if (title) {
            filter.title = ILike(`%${title}%`);
        }
        const [data, total] = await this.newsRepository.findAndCount({
            where: filter,
            select,
            relations,
            order,
            relationLoadStrategy: 'query',
            take: limit,
            loadEagerRelations: false,
            skip: UtilsService.calculateSkipRecords(page, limit, skip),
        });
        const totalPages = UtilsService.calculateTotalPages(total, skip, limit);
        return { data, total, totalPages, ...query };
    }

    async findById(id: string): Promise<News> {
        const select: FindOptionsSelect<News> = {
            id: true,
            title: true,
            text: true,
            category: true,
            photo: true,
            createdAt: true,
            foodAndDrink: {
                id: true,
                name: true,
            },
        };
        const relations: FindOptionsRelations<News> = {
            foodAndDrink: true,
        };

        return (await this.newsRepository.findOne({
            where: { id },
            select,
            relations,
            relationLoadStrategy: 'query',
        })) as News;
    }

    async update(id: string, updateNewsDto: UpdateNewsDto): Promise<void> {
        await this.newsRepository.update(id, updateNewsDto);
    }

    async delete(id: string): Promise<void> {
        await this.newsRepository.delete(id);
    }

    async uploadPhoto(
        news: News,
        uploadPhoto: Express.Multer.File,
    ): Promise<void> {
        const { photo, id } = news;
        if (photo) {
            await this.storageService.deleteFile(photo);
        }
        const uploadPhotoPath = await this.storageService.uploadFile(
            uploadPhoto,
            itemNameEnum.NEWS,
            id,
        );
        await this.newsRepository.update(id, { photo: uploadPhotoPath });
    }

    async deletePhoto(news: News): Promise<void> {
        const { photo, id } = news;
        if (!photo) {
            throw new NotFoundException('У новини відсутня фотографія.');
        }
        await this.storageService.deleteFile(photo);
        await this.newsRepository.update(id, { photo: null });
    }

    async isExistsById(id: string): Promise<boolean> {
        return this.newsRepository.existsBy({ id });
    }

    async hasPermission(id: string, userId: string, req: IUserRequest) {
        const news = await this.newsRepository.findOne({
            where: { id },
            relations: { foodAndDrink: true },
            select: {
                id: true,
                photo: true,
                foodAndDrink: {
                    id: true,
                    ownerId: true,
                },
            },
            relationLoadStrategy: 'query',
        });
        if (!news) {
            throw new NotFoundException(`Новина з id ${id} не знайдено`);
        }
        req['news'] = news;
        const {
            foodAndDrink: { ownerId },
        } = news;
        return ownerId === userId;
    }
}
