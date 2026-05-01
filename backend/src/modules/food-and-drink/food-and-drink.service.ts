import {
    BadRequestException,
    ConflictException,
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateFoodAndDrinkDto } from './dto/create-food-and-drink.dto';
import { UpdateFoodAndDrinkDto } from './dto/update-food-and-drink.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodAndDrink } from './entities/food-and-drink.entity';
import {
    DeepPartial,
    FindOptionsRelations,
    FindOptionsWhere,
    LessThan,
    LessThanOrEqual,
    Like,
    MoreThan,
    MoreThanOrEqual,
    Repository,
} from 'typeorm';
import { User } from '../users/entities/user.entity';
import { FoodAndDrinkQueryDto } from './dto/food-and-drink-query.dto';
import { Features } from './entities/features.entity';
import { FoodAndDrinkSearchDto } from './dto/food-and-drink-search.dto';
import { FoodAndDrinkRangeDto } from './dto/food-and-drink-range.dto';
import { TagsService } from '../tags/tags.service';
import { FoodAndDrinkStatusEnum } from './enums/food-and-drink-status.enum';
import { SuperadminFoodAndDrinkQueryDto } from '../protected-food-and-drink/dto/superadmin-food-and-drink-query.dto';
import { CoordinatesDto } from './dto/location.dto';

@Injectable()
export class FoodAndDrinkService {
    constructor(
        @InjectRepository(FoodAndDrink)
        private readonly foodAndDrinkRepository: Repository<FoodAndDrink>,
        @Inject(forwardRef(() => TagsService))
        private readonly tagsService: TagsService,
    ) {}

    async find(
        query: FoodAndDrinkQueryDto | SuperadminFoodAndDrinkQueryDto,
        filterOptions?: FindOptionsWhere<FoodAndDrink>,
    ): Promise<[FoodAndDrink[], number]> {
        const { page, limit, skip, search, range, lng, lat } = query;
        let { sort } = query;
        const filter: FindOptionsWhere<FoodAndDrink> = { ...filterOptions };
        const allFeatures = ['isWifi', 'isParking', 'is24hrs', 'isLiveMusic'];
        const enums = ['status'];
        const features: FindOptionsWhere<Features> = {};
        if (search) {
            (
                Object.entries(search) as [
                    keyof FoodAndDrinkSearchDto,
                    FoodAndDrinkSearchDto[keyof FoodAndDrinkSearchDto],
                ][]
            ).forEach(([key, value]) => {
                if (value) {
                    if (!allFeatures.includes(key)) {
                        switch (typeof value) {
                            case 'string':
                                filter[key] = enums.includes(key)
                                    ? value
                                    : Like(`%${value}%`);
                                break;
                            default:
                                filter[key] = value;
                                break;
                        }
                    } else {
                        features[key] = value;
                    }
                }
            });
        }
        filter['features'] = features;
        if (range) {
            (
                Object.entries(range) as [
                    keyof FoodAndDrinkRangeDto,
                    FoodAndDrinkRangeDto[keyof FoodAndDrinkRangeDto],
                ][]
            ).forEach(([key, value]) => {
                if (value) {
                    if (value.lt) {
                        filter[key] = LessThan(value.lt);
                    }
                    if (value.lte) {
                        filter[key] = LessThanOrEqual(value.lte);
                    }
                    if (value.gt) {
                        filter[key] = MoreThan(value.gt);
                    }
                    if (value.gte) {
                        filter[key] = MoreThanOrEqual(value.gte);
                    }
                }
            });
        }
        if (sort && sort.distance && lng && lat) {
            const queryBuilder = this.foodAndDrinkRepository
                .createQueryBuilder(`foodAndDrink`)
                .addSelect(
                    `ST_Distance_Sphere(point(CAST(foodAndDrink.location -> '$.coordinates.lng' as DECIMAL(10,8)), CAST(foodAndDrink.location -> '$.coordinates.lat' as DECIMAL(10,8))), point(:userLng, :userLat))`,
                    'distance',
                )
                .setParameters({
                    userLng: lng,
                    userLat: lat,
                })
                .where(filter)
                .orderBy('distance', 'ASC');
            const { distance, ...restSort } = sort;
            Object.entries(restSort).forEach(([key, value]) => {
                const order = value === 'asc' ? 'ASC' : 'DESC';
                queryBuilder.addOrderBy(key, order);
            });
            const { entities, raw } = await queryBuilder.getRawAndEntities();
            const count = await this.foodAndDrinkRepository.countBy(filter);

            // Мапимо дистанцію назад у об'єкти (опціонально)
            const result = entities.map((entity, index) => {
                const distance = (raw[index] as { distance: number }).distance;
                return {
                    ...entity,
                    distance:
                        distance < 1000
                            ? `${distance} м`
                            : `${Number((distance / 1000).toFixed(2))} км`,
                };
            });

            return [result, count];
        }
        if (sort && sort.distance) {
            const { distance, ...restSort } = sort;
            sort = restSort;
        }
        return await Promise.all([
            this.foodAndDrinkRepository.find({
                take: limit,
                skip: (page - 1) * limit + skip,
                where: filter,
                order: sort,
            }),
            this.foodAndDrinkRepository.countBy(filter),
        ]);
    }

    async findById(
        id: string,
        relations?: FindOptionsRelations<FoodAndDrink>,
    ): Promise<FoodAndDrink | null> {
        return await this.foodAndDrinkRepository.findOne({
            where: { id },
            relations,
        });
    }

    async findActiveById(
        id: string,
        relations?: FindOptionsRelations<FoodAndDrink>,
    ): Promise<FoodAndDrink> {
        const foodAndDrink = await this.foodAndDrinkRepository.findOne({
            where: {
                id,
                status: FoodAndDrinkStatusEnum.ACTIVE,
            },
            relations,
        });
        if (!foodAndDrink) {
            throw new NotFoundException('Такого закладу не існує');
        }
        return foodAndDrink;
    }

    async create(
        createFoodAndDrinkDto: CreateFoodAndDrinkDto,
        owner: User,
    ): Promise<FoodAndDrink> {
        const { tags, cityId } = createFoodAndDrinkDto;
        await this.checkExisting(createFoodAndDrinkDto, owner.id);
        const allTags = tags
            ? await this.tagsService.createAndGetTags(tags)
            : undefined;
        const foodAndDrink = this.foodAndDrinkRepository.create({
            ...createFoodAndDrinkDto,
            owner,
            tags: allTags,
            cityId,
        });
        await this.foodAndDrinkRepository.save(foodAndDrink);
        return (await this.findById(foodAndDrink.id)) as FoodAndDrink;
    }

    async update(
        id: string,
        updateFoodAndDrinkDto: UpdateFoodAndDrinkDto,
    ): Promise<FoodAndDrink> {
        if (Object.keys(updateFoodAndDrinkDto).length === 0) {
            throw new BadRequestException('Body не має бути порожнім');
        }
        const { tags } = updateFoodAndDrinkDto;
        await this.checkExisting(updateFoodAndDrinkDto);
        const entity = (await this.foodAndDrinkRepository.findOne({
            where: { id },
        })) as FoodAndDrink;

        const allTags = tags
            ? await this.tagsService.createAndGetTags(tags)
            : undefined;

        const updatedEntity = this.foodAndDrinkRepository.merge(entity, {
            ...updateFoodAndDrinkDto,
            tags: allTags,
        });

        return await this.foodAndDrinkRepository.save(updatedEntity);
    }

    async delete(id: string): Promise<void> {
        await this.foodAndDrinkRepository.delete(id);
    }

    async save(foodAndDrink: FoodAndDrink): Promise<FoodAndDrink> {
        return await this.foodAndDrinkRepository.save(foodAndDrink);
    }

    merge(
        foodAndDrink: FoodAndDrink,
        entityLike: DeepPartial<FoodAndDrink>,
    ): FoodAndDrink {
        return this.foodAndDrinkRepository.merge(foodAndDrink, entityLike);
    }

    async findOneByParams(
        params: FindOptionsWhere<FoodAndDrink>,
    ): Promise<FoodAndDrink | null> {
        return await this.foodAndDrinkRepository.findOneBy(params);
    }

    async existsByParams(
        params: FindOptionsWhere<FoodAndDrink>,
    ): Promise<boolean> {
        return await this.foodAndDrinkRepository.existsBy(params);
    }

    async existsByCoordinates(coordinates: CoordinatesDto): Promise<boolean> {
        return await this.foodAndDrinkRepository
            .createQueryBuilder('foodAndDrink')
            .where('foodAndDrink.location -> "$.coordinates.lat" = :lat')
            .andWhere('foodAndDrink.location -> "$.coordinates.lng" = :lng')
            .setParameters(coordinates)
            .getExists();
    }

    async isExistsById(id: string): Promise<boolean> {
        return await this.foodAndDrinkRepository.existsBy({ id });
    }

    async findOneByOwner(user: User): Promise<FoodAndDrink> {
        const foodAndDrink = await this.findOneByParams({ ownerId: user.id });
        if (!foodAndDrink) {
            throw new NotFoundException('Ви не є власником жодного закладу');
        }
        return foodAndDrink;
    }

    async approve(id: string): Promise<FoodAndDrink> {
        const foodAndDrink = (await this.findById(id)) as FoodAndDrink;
        if (foodAndDrink.status === FoodAndDrinkStatusEnum.ACTIVE) {
            throw new ConflictException('Цей заклад вже є активний');
        }
        foodAndDrink.status = FoodAndDrinkStatusEnum.ACTIVE;
        return this.foodAndDrinkRepository.save(foodAndDrink);
    }

    private async checkExisting(
        foodAndDrink: CreateFoodAndDrinkDto | UpdateFoodAndDrinkDto,
        ownerId?: string,
    ): Promise<void> {
        const { phone, location } = foodAndDrink;
        let isExistsFoodAndDrink = phone
            ? await this.existsByParams({ phone })
            : false;
        if (isExistsFoodAndDrink) {
            throw new ConflictException(
                'Цей телефон вже прив`язаний до інакшого закладу. Виберіть інакший варіант.',
            );
        }
        isExistsFoodAndDrink =
            location && location.coordinates
                ? await this.existsByCoordinates(location.coordinates)
                : false;
        if (isExistsFoodAndDrink) {
            throw new ConflictException(
                'За цією адресою вже роозташований інакший заклад. Виберіть інакший варіант.',
            );
        }
        isExistsFoodAndDrink = ownerId
            ? await this.existsByParams({ ownerId })
            : false;
        if (isExistsFoodAndDrink) {
            throw new ConflictException(
                'Ви вже володієте закладом. Користувач не може мати більше, ніж один заклад.',
            );
        }
    }
}
