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
    FindOperator,
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
import { SuperadminFoodAndDrinkQueryDto } from '../superadmin-food-and-drink/dto/superadmin-food-and-drink-query.dto';
import { StorageService } from '../storage/storage.service';
import { itemNameEnum } from '../storage/enums/itemNameEnum';
import { RemoveImagesFoodAndDrinkDto } from './dto/remove-images-food-and-drink.dto';
import { UtilsService } from '../utils/utils.service';
import { SuperadminFoodAndDrinkStatusDto } from '../superadmin-food-and-drink/dto/superadmin-food-and-drink-status.dto';
import { FoodAndDrinkSortByEnum } from './enums/food-and-drink-sort-by.enum';
import { CoordinatesDto } from './dto/coordinates.dto';
import { SortEnum } from '../../shared/enums/sort.enum';
import { GlobalUserRoleEnum } from '../users/enums/global.user.role.enum';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/entities/role.entity';
import { SuperadminFoodAndDrinkBindOwnershipDto } from '../superadmin-food-and-drink/dto/superadmin-food-and-drink-bind-ownership.dto';
import { UsersService } from '../users/users.service';
import { ResponseFindActiveFoodAndDrinkByIdDto } from './dto/response-find-active-food-and-drink-by-id.dto';
import { FoodAndDrinkFavouritesService } from '../food-and-drink-favourites/food-and-drink-favourites.service';
import { FoodAndDrinkStatisticsService } from '../food-and-drink-statistics/food-and-drink-statistics.service';
import { FoodAndDrinkViewsService } from '../food-and-drinks-views/food-and-drink-views.service';
import { ContactManagerDto } from './dto/contact-manager.dto';
import { TokensService } from '../tokens/tokens.service';
import { EmailService } from '../email/email.service';
import { EmailTypeEnum } from '../email/enums/email-type.enum';
import { IJwtFoodAndDrinkActionPayload } from '../auth/interfaces/IJwtFoodAndDrinkActionPayload';
import { ErrorResponse } from '../../shared/error/error-response';
import { Tag } from '../tags/entity/tag.entity';
import { City } from '../cities/entities/city.entity';
import { SuperadminFoodAndDrinkUpdateDto } from '../superadmin-food-and-drink/dto/superadmin-food-and-drink-update.dto';

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
        private readonly tokensService: TokensService,
        private readonly emailService: EmailService,
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
        const order: FindOptionsOrder<FoodAndDrink> = { rating: 'desc' };
        const relations: FindOptionsRelations<FoodAndDrink> = {};
        const enums = ['status', 'type'];
        if (features) {
            filter['features'] = Raw(
                (alias) => `JSON_CONTAINS(${alias}, :feat)`,
                { feat: JSON.stringify(features) },
            );
        }
        const searchEntries = Object.entries(search);
        if (searchEntries.length > 0) {
            searchEntries.forEach(([searchBy, search]) => {
                if (typeof search !== 'undefined') {
                    switch (typeof search) {
                        case 'string': {
                            let findOperator:
                                | FindOptionsWhere<Tag>
                                | FindOptionsWhere<City>
                                | string
                                | FindOperator<string> = Like(`${search}%`);
                            switch (searchBy) {
                                case 'tag':
                                    findOperator = {
                                        name: search,
                                    };
                                    searchBy = 'tags';
                                    break;
                                case 'city':
                                    findOperator = {
                                        name: Like(`%${search}%`),
                                    };
                                    break;
                            }
                            if (enums.includes(searchBy)) {
                                findOperator = search;
                            }
                            filter[searchBy] = findOperator;
                            break;
                        }
                        case 'object':
                            if (search.lte && search.gte) {
                                filter[searchBy] = Between(
                                    search.gte,
                                    search.lte,
                                );
                            } else if (search.lte) {
                                filter[searchBy] = LessThanOrEqual(search.lte);
                            } else if (search.gte) {
                                filter[searchBy] = MoreThanOrEqual(search.gte);
                            }
                            break;
                        default:
                            filter[searchBy] = search;
                            break;
                    }
                }
            });
        }
        if (search.isTop) {
            relations['topCategories'] = true;
        }
        if (
            sortBy &&
            sortBy === FoodAndDrinkSortByEnum.DISTANCE &&
            lng &&
            lat &&
            sort === SortEnum.ASC
        ) {
            delete order['rating'];
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
                .take(limit)
                .skip((page - 1) * limit + skip)
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
            delete order['rating'];
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
                relations,
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
        const isOwner = userId ? foodAndDrink.ownerId === userId : null;
        return { ...foodAndDrink, isFavourite, isOwner };
    }

    async create(
        createFoodAndDrinkDto: CreateFoodAndDrinkDto,
        owner: User,
    ): Promise<FoodAndDrink> {
        const { tags, cityId, email } = createFoodAndDrinkDto;
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
        const token = this.tokensService.generateAction(
            { foodAndDrinkId: foodAndDrink.id },
            'activate',
        );
        await this.emailService.sendEmail(
            EmailTypeEnum.CONFIRM_FOOD_AND_DRINK_EMAIL,
            email,
            {
                token,
            },
        );
        return (await this.findById(foodAndDrink.id)) as FoodAndDrink;
    }

    async confirmFoodAndDrinkEmail(token: string): Promise<void> {
        const { foodAndDrinkId } = this.tokensService.verify(
            token,
            'activate',
        ) as IJwtFoodAndDrinkActionPayload;
        const foodAndDrink = (await this.foodAndDrinkRepository.findOneBy({
            id: foodAndDrinkId,
        })) as FoodAndDrink;
        if (foodAndDrink.isEmailVerified) {
            throw new ConflictException(
                new ErrorResponse(
                    'USER_ALREADY_ACTIVE',
                    'Заклад вже підтверджений',
                ),
            );
        }
        foodAndDrink.isEmailVerified = true;
        await this.foodAndDrinkRepository.save(foodAndDrink);
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

        const savedFoodAndDrink =
            await this.foodAndDrinkRepository.save(updatedEntity);
        await this.foodAndDrinkRepository.update(id, {
            status: FoodAndDrinkStatusEnum.PENDING,
        });
        return savedFoodAndDrink;
    }

    async systemUpdate(
        id: string,
        superadminFoodAndDrinkDto: SuperadminFoodAndDrinkUpdateDto,
    ): Promise<void> {
        await this.foodAndDrinkRepository.update(id, superadminFoodAndDrinkDto);
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

    async contact(
        contactManagerDto: ContactManagerDto,
        foodAndDrinkId: string,
        user: User | null,
    ): Promise<void> {
        const { message, email: userEmail, subject } = contactManagerDto;
        const sender = user
            ? `${user.name} ${user.surname}`
            : 'Анонімний гість';
        const { email: foodAndDrinkEmail, name } =
            (await this.foodAndDrinkRepository.findOne({
                where: { id: foodAndDrinkId },
                select: ['id', 'email', 'name'],
            })) as FoodAndDrink;
        console.log(`
        ========== [EMAIL OUTBOX] НАДІСЛАНО НА: "${foodAndDrinkEmail}" ==========
        Тема: [Пиячок] Нове запитання від користувача стосовно закладу ${name}
        
        Привіт! На платформі «Пиячок» користувач залишив звернення до вашого закладу.
        
        Деталі повідомлення:
        ----------------------------------------------------------------------
        • Відправник: ${sender} 
        • Зворотний Email для відповіді: ${userEmail}
        • Тема звернення: ${subject}
        ----------------------------------------------------------------------
        
        Текст повідомлення:
        ${message}
        
        ----------------------------------------------------------------------
        💡 Щоб відповісти клієнту, просто напишіть йому на пошту: ${userEmail}
        ======================================================================
        `);
    }

    private async checkExisting(
        foodAndDrink: CreateFoodAndDrinkDto | UpdateFoodAndDrinkDto,
        ownerId?: string,
    ): Promise<void> {
        const { phone, location, email } = foodAndDrink;
        let isExistsFoodAndDrink = phone
            ? await this.existsByParams({ phone })
            : false;
        if (isExistsFoodAndDrink) {
            throw new ConflictException(
                'Цей телефон вже прив`язаний до інакшого закладу. Виберіть інакший варіант.',
            );
        }
        isExistsFoodAndDrink = email
            ? await this.existsByParams({ email })
            : false;
        if (isExistsFoodAndDrink) {
            throw new ConflictException(
                'Ця електронна пошта вже прив`язана до інакшого закладу. Виберіть інакший варіант.',
            );
        }
        const isExistsUser = email
            ? await this.userRepository.existsBy({ email })
            : false;
        if (isExistsUser) {
            throw new ConflictException(
                'Заклад не може мати електронну адресу користувача.',
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
