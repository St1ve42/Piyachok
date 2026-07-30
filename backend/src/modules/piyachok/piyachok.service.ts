import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    FindOptionsOrder,
    FindOptionsRelations,
    FindOptionsSelect,
    Repository,
} from 'typeorm';
import { CreatePiyachokDto } from './dto/create-piyachok.dto';
import { UpdatePiyachokDto } from './dto/update-piyachok.dto';
import { Piyachok } from './entities/piyachok.entity';
import { PiyachokReply } from '../piyachok-replies/entities/piyachok-reply.entity';
import { UtilsService } from '../utils/utils.service';
import { QueryBaseDto } from '../../shared/dto/query-base.dto';
import { FoodAndDrink } from '../food-and-drink/entities/food-and-drink.entity';
import { FoodAndDrinkStatusEnum } from '../food-and-drink/enums/food-and-drink-status.enum';

@Injectable()
export class PiyachokService {
    constructor(
        @InjectRepository(Piyachok)
        private readonly piyachokRepository: Repository<Piyachok>,
        @InjectRepository(PiyachokReply)
        private readonly piyachokReplyRepository: Repository<PiyachokReply>,
        @InjectRepository(FoodAndDrink)
        private readonly foodAndDrinkRepository: Repository<FoodAndDrink>,
    ) {}

    async create(
        createPiyachokDto: CreatePiyachokDto,
        creatorId: string,
    ): Promise<Piyachok> {
        const { foodAndDrinkId } = createPiyachokDto;
        const existsFoodAndDrink = await this.foodAndDrinkRepository.existsBy({
            id: foodAndDrinkId,
            status: FoodAndDrinkStatusEnum.ACTIVE,
        });
        if (!existsFoodAndDrink) {
            throw new NotFoundException(
                `Заклад з id ${foodAndDrinkId} не знайдено`,
            );
        }
        const existsPiyachok = await this.piyachokRepository.existsBy({
            creatorId,
        });
        if (existsPiyachok) {
            throw new ConflictException(
                `Ви не можете створити більше, ніж один пиячок.`,
            );
        }
        const piyachok = this.piyachokRepository.create({
            ...createPiyachokDto,
            creatorId,
        });
        await this.piyachokRepository.insert(piyachok);

        const select: FindOptionsSelect<Piyachok> = {
            id: true,
            meetDate: true,
            meetTime: true,
            purpose: true,
            targetGender: true,
            peopleCount: true,
            paymentType: true,
            budget: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        };

        return (await this.piyachokRepository.findOne({
            where: { id: piyachok.id },
            select,
        })) as Piyachok;
    }

    async find(query: QueryBaseDto): Promise<{
        data: Piyachok[];
        total: number;
        totalPages: number;
        page: number;
        limit: number;
        skip: number;
    }> {
        const { limit, page, skip } = query;

        const select: FindOptionsSelect<Piyachok> = {
            id: true,
            meetDate: true,
            meetTime: true,
            purpose: true,
            status: true,
            createdAt: true,
            foodAndDrink: {
                id: true,
                name: true,
                mainImage: true,
            },
        };

        const relations: FindOptionsRelations<Piyachok> = {
            foodAndDrink: true,
            creator: true,
        };

        const order: FindOptionsOrder<Piyachok> = {
            createdAt: 'desc',
        };

        const [data, total] = await this.piyachokRepository.findAndCount({
            select,
            relations,
            order,
            relationLoadStrategy: 'query',
            take: limit,
            skip: UtilsService.calculateSkipRecords(page, limit, skip),
        });

        const totalPages = UtilsService.calculateTotalPages(total, skip, limit);
        return { data, total, totalPages, page, limit, skip };
    }

    async findById(id: string): Promise<Piyachok> {
        const select: FindOptionsSelect<Piyachok> = {
            id: true,
            meetDate: true,
            meetTime: true,
            purpose: true,
            targetGender: true,
            peopleCount: true,
            paymentType: true,
            budget: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            foodAndDrink: {
                id: true,
                name: true,
                mainImage: true,
            },
            creator: {
                id: true,
                name: true,
                surname: true,
                photo: true,
            },
        };

        const relations: FindOptionsRelations<Piyachok> = {
            foodAndDrink: true,
            creator: true,
        };

        return (await this.piyachokRepository.findOne({
            where: { id },
            select,
            relations,
            relationLoadStrategy: 'query',
        })) as Piyachok;
    }

    async update(
        id: string,
        updatePiyachokDto: UpdatePiyachokDto,
    ): Promise<void> {
        await this.piyachokRepository.update(id, updatePiyachokDto);
    }

    async delete(id: string): Promise<void> {
        await this.piyachokRepository.delete(id);
    }

    async hasPermission(id: string, userId: string): Promise<boolean> {
        const piyachok = await this.piyachokRepository.findOneBy({ id });
        if (!piyachok) {
            throw new NotFoundException('Пиячок не знайдено');
        }
        const { creatorId } = piyachok;
        return creatorId === userId;
    }

    async isExistsById(id: string): Promise<boolean> {
        return this.piyachokRepository.existsBy({ id });
    }
}
