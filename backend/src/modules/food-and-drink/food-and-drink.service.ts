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
    Between,
    DeepPartial,
    FindOptionsOrder,
    FindOptionsRelations,
    FindOptionsWhere,
    LessThanOrEqual,
    Like,
    MoreThanOrEqual,
    Raw,
    Repository,
} from 'typeorm';
import { User } from '../users/entities/user.entity';
import { TagsService } from '../tags/tags.service';
import { FoodAndDrinkStatusEnum } from './enums/food-and-drink-status.enum';
import { SuperadminFoodAndDrinkQueryDto } from '../protected-food-and-drink/dto/superadmin-food-and-drink-query.dto';
import { StorageService } from '../storage/storage.service';
import { itemNameEnum } from '../storage/enums/itemNameEnum';
import { RemoveImagesFoodAndDrinkDto } from './dto/remove-images-food-and-drink.dto';
import { UtilsService } from '../utils/utils.service';
import { SuperadminFoodAndDrinkStatusDto } from '../protected-food-and-drink/dto/superadmin-food-and-drink-status.dto';
import { FoodAndDrinkSortByEnum } from './enums/food-and-drink-sort-by.enum';
import { CoordinatesDto } from './dto/coordinates.dto';
import { SortEnum } from '../../shared/enums/sort.enum';
import { GlobalUserRoleEnum } from '../users/enums/global.user.role.enum';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/entities/role.entity';
import { SuperadminFoodAndDrinkBindOwnershipDto } from '../protected-food-and-drink/dto/superadmin-food-and-drink-bind-ownership.dto';
import { UsersService } from '../users/users.service';
import { ResponseFindActiveFoodAndDrinkByIdDto } from './dto/response-find-active-food-and-drink-by-id.dto';
import { FoodAndDrinkFavouritesService } from '../food-and-drink-favourites/food-and-drink-favourites.service';
import { FoodAndDrinkStatisticsService } from '../food-and-drink-statistics/food-and-drink-statistics.service';
import { FoodAndDrinkViewsService } from '../food-and-drinks-views/food-and-drink-views.service';

@Injectable()
export class FoodAndDrinkService {
    constructor(
        @InjectRepository(FoodAndDrink)
        private readonly foodAndDrinkRepository: Repository<FoodAndDrink>,
        @Inject(forwardRef(() => TagsService))
        private readonly tagsService: TagsService,
        private readonly storageService: StorageService,
        private readonly roleService: RolesService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly userService: UsersService,
        private readonly foodAndDrinkFavouritesService: FoodAndDrinkFavouritesService,
        private readonly foodAndDrinkStatisticsService: FoodAndDrinkStatisticsService,
        private readonly foodAndDrinkViewsService: FoodAndDrinkViewsService,
    ) {}

    async find(
        query: SuperadminFoodAndDrinkQueryDto,
        filterOptions?: FindOptionsWhere<FoodAndDrink>,
    ): Promise<[FoodAndDrink[], number, number]> {
        const {
            page,
            limit,
            skip,
            lat,
            lng,
            features,
            sort,
            sortBy,
            ...search
        } = query;
        const filter: FindOptionsWhere<FoodAndDrink> = { ...filterOptions };
        const order: FindOptionsOrder<FoodAndDrink> = {};
        const enums = ['status', 'type'];
        if (features) {
            filter['features'] = Raw(
                (alias) => `JSON_CONTAINS(${alias}, :feat)`,
                { feat: JSON.stringify(features) },
            );
        }
        if (search) {
            Object.entries(search).forEach(([key, value]) => {
                if (value) {
                    switch (typeof value) {
                        case 'string':
                            if (key === 'tag') {
                                filter['tags'] = { name: value };
                            } else if (enums.includes(key)) {
                                filter[key] = value;
                            } else {
                                filter[key] = Like(`%${value}%`);
                            }
                            break;
                        case 'object':
                            if (value.lte && value.gte) {
                                filter[key] = Between(value.gte, value.lte);
                            } else if (value.lte) {
                                filter[key] = LessThanOrEqual(value.lte);
                            } else if (value.gte) {
                                filter[key] = MoreThanOrEqual(value.gte);
                            }
                            break;
                        default:
                            filter[key] = value;
                            break;
                    }
                }
            });
        }
        if (
            sortBy &&
            sortBy === FoodAndDrinkSortByEnum.DISTANCE &&
            lng &&
            lat &&
            sort === SortEnum.ASC
        ) {
            const queryBuilder = this.foodAndDrinkRepository
                .createQueryBuilder(`foodAndDrink`)
                .addSelect(
                    `ST_Distance_Sphere(point(CAST(foodAndDrink.location -> '$.coordinates.lng' as DECIMAL(10,8)), CAST(foodAndDrink.location -> '$.coordinates.lat' as DECIMAL(10,8))), point(:userLng, :userLat))`,
                    'distance',
                )
                .innerJoinAndSelect('foodAndDrink.city', 'city')
                .setParameters({
                    userLng: lng,
                    userLat: lat,
                })
                .where(filter)
                .orderBy('distance', 'ASC');
            const { entities, raw } = await queryBuilder.getRawAndEntities();
            const total = await this.foodAndDrinkRepository.countBy(filter);

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
            const totalPages = Math.ceil((total - skip) / limit);
            return [result, total, totalPages];
        }
        if (sortBy && sort && sortBy !== FoodAndDrinkSortByEnum.DISTANCE) {
            order[sortBy] = sort;
        }
        const total = await this.foodAndDrinkRepository.countBy(filter);
        const totalPages = Math.ceil((total - skip) / limit);
        return [
            await this.foodAndDrinkRepository.find({
                take: limit,
                skip: (page - 1) * limit + skip,
                where: filter,
                order,
            }),
            total,
            totalPages,
        ];
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
        userId?: string,
        relations?: FindOptionsRelations<FoodAndDrink>,
    ): Promise<ResponseFindActiveFoodAndDrinkByIdDto> {
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
        const isFavourite = userId
            ? await this.foodAndDrinkFavouritesService.checkIfIsFavourite(
                  userId,
                  id,
              )
            : null;
        if (userId && foodAndDrink.ownerId !== userId) {
            const existsUserView =
                await this.foodAndDrinkViewsService.existsUserView(
                    userId,
                    foodAndDrink.id,
                );
            if (!existsUserView) {
                await this.foodAndDrinkViewsService.upsertViewPerDay(
                    foodAndDrink.id,
                );
                await this.foodAndDrinkViewsService.createViewUser(
                    userId,
                    foodAndDrink.id,
                );
                await this.foodAndDrinkStatisticsService.increment(
                    foodAndDrink.id,
                    'totalViews',
                );
            }
        }
        return { ...foodAndDrink, isFavourite };
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
        if (
            (owner.role.name as GlobalUserRoleEnum) === GlobalUserRoleEnum.USER
        ) {
            owner.role = (await this.roleService.findBy({
                name: GlobalUserRoleEnum.ADMIN,
            })) as Role;
            owner.ownerOf = foodAndDrink;
        }
        await this.userRepository.save(owner);
        await this.foodAndDrinkStatisticsService.create(foodAndDrink.id);
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
        const { owner } = (await this.findById(id, {
            owner: true,
        })) as FoodAndDrink;
        if (owner.role.name === GlobalUserRoleEnum.ADMIN.toString()) {
            owner.role = (await this.roleService.findBy({
                name: GlobalUserRoleEnum.USER,
            })) as Role;
        }
        await this.foodAndDrinkRepository.delete(id);
        await this.userRepository.save(owner);
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

    async uploadImages(
        id: string,
        files: Express.Multer.File[],
    ): Promise<void> {
        const foodAndDrink = (await this.findById(id)) as FoodAndDrink;
        const { images } = foodAndDrink;
        if (images) {
            await Promise.all(
                images.map(
                    async (image) =>
                        await this.storageService.deleteFile(image),
                ),
            );
            foodAndDrink.images = null;
            foodAndDrink.mainImage = null;
        }
        if (files) {
            for (const file of files) {
                const path = await this.storageService.uploadFile(
                    file,
                    itemNameEnum.FOOD_AND_DRINK,
                    id,
                );
                if (foodAndDrink.images) {
                    foodAndDrink.images.push(path);
                } else {
                    foodAndDrink.images = [path];
                    foodAndDrink.mainImage = path;
                }
            }
        }
        await this.foodAndDrinkRepository.save(foodAndDrink);
    }

    async removeImages(
        id: string,
        removeImagesFoodAndDrinkDto: RemoveImagesFoodAndDrinkDto,
    ): Promise<FoodAndDrink> {
        const foodAndDrink = (await this.findById(id)) as FoodAndDrink;
        const { images } = foodAndDrink;
        const { images: removeImages } = removeImagesFoodAndDrinkDto;
        if (!images) {
            throw new NotFoundException(
                'Заклад не містить жодного зображення.',
            );
        }
        const notExistingImages = removeImages.filter(
            (removeImage) => !images.includes(removeImage),
        );
        if (notExistingImages.length !== 0) {
            throw new ConflictException(
                `Заклад не містить зображення зі шляхом ${UtilsService.outputArray(notExistingImages)}.`,
            );
        }
        for (const removeImage of removeImages) {
            await this.storageService.deleteFile(removeImage);
            const imageIndex = images.indexOf(removeImage);
            if (imageIndex === 0 && images.length !== 1) {
                foodAndDrink.mainImage = images[1];
            }
            images.splice(imageIndex, 1);
        }
        if (images.length === 0) {
            foodAndDrink.images = null;
            foodAndDrink.mainImage = null;
        } else {
            foodAndDrink.images = images;
        }
        return await this.save(foodAndDrink);
    }

    async isExistsById(id: string): Promise<boolean> {
        return await this.foodAndDrinkRepository.existsBy({ id });
    }

    async findOneByOwner(userId: string): Promise<FoodAndDrink> {
        const foodAndDrink = await this.findOneByParams({ ownerId: userId });
        if (!foodAndDrink) {
            throw new NotFoundException('Ви не є власником жодного закладу');
        }
        return foodAndDrink;
    }

    async setStatus(
        id: string,
        superadminFoodAndDrinkStatusDto: SuperadminFoodAndDrinkStatusDto,
    ): Promise<void> {
        const { status } = superadminFoodAndDrinkStatusDto;
        const foodAndDrink = (await this.findById(id, {
            owner: true,
        })) as FoodAndDrink;
        if (foodAndDrink.status === status) {
            throw new ConflictException(`Цей заклад вже має статус ${status}`);
        }
        foodAndDrink.status = status;
        await this.foodAndDrinkRepository.save(foodAndDrink);
    }

    async bindOwnership(
        id: string,
        superadminFoodAndDrinkBindOwnershipDto: SuperadminFoodAndDrinkBindOwnershipDto,
    ): Promise<void> {
        const { userId } = superadminFoodAndDrinkBindOwnershipDto;
        const userToBind = await this.userRepository.findOne({
            where: { id: userId },
            relations: { ownerOf: true },
        });
        if (!userToBind)
            throw new NotFoundException(
                `Користувача з id ${userId} не знайдено`,
            );

        if (userToBind.ownerOf?.id === id)
            throw new ConflictException(
                `Користувача є власником поточного закладу`,
            );

        if (userToBind.ownerOf)
            throw new ConflictException(
                `Користувача є власником інакшого закладу`,
            );
        const foodAndDrink = (await this.foodAndDrinkRepository.findOne({
            where: { id },
            relations: { owner: true },
        })) as FoodAndDrink;
        const { owner: oldOwner } = foodAndDrink;
        await this.foodAndDrinkRepository.update(id, {
            owner: { id: userId },
        });
        userToBind.ownerOf = foodAndDrink;
        oldOwner.ownerOf = null;
        await this.userService.updateRole(userToBind, GlobalUserRoleEnum.ADMIN);
        await this.userService.updateRole(oldOwner, GlobalUserRoleEnum.USER);
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
