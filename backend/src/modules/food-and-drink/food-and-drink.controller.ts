import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseFilePipeBuilder,
    Patch,
    Post,
    Query,
    Req,
    SerializeOptions,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FoodAndDrinkService } from './food-and-drink.service';
import { CreateFoodAndDrinkDto } from './dto/create-food-and-drink.dto';
import { UpdateFoodAndDrinkDto } from './dto/update-food-and-drink.dto';
import { FoodAndDrinkIdValidationPipe } from '../../shared/pipes/id-validation.pipe';
import { FoodAndDrinkBodyValidationPipe } from '../../shared/pipes/body-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import type { IUserRequest } from '../auth/interfaces/IUserRequest';
import { FoodAndDrinkInfoPresenter } from './presenters/food-and-drink-info.presenter';
import { FoodAndDrinkQueryDto } from './dto/food-and-drink-query.dto';
import {
    FoodAndDrinkResponseFindPresenter,
    ReviewWithOwnerFindPresenter,
    ReviewStatisticsFindPresenter,
    CommentFoodAndDrinkFindPresenter,
    FoodAndDrinkNewsFindPresenter,
} from '../../shared/presenters/find.presenter';
import { CanManageOrCheckStatisticsFoodAndDrinkGuard } from './guards/can-manage-or-check-statistics-food-and-drink.guard';
import { FoodAndDrinkStatusEnum } from './enums/food-and-drink-status.enum';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RemoveImagesFoodAndDrinkDto } from './dto/remove-images-food-and-drink.dto';
import { FoodAndDrink } from './entities/food-and-drink.entity';
import {
    ApiTags,
    ApiOperation,
    ApiCreatedResponse,
    ApiBadRequestResponse,
    ApiUnauthorizedResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiNotFoundResponse,
    ApiNoContentResponse,
    ApiCookieAuth,
    ApiParam,
    ApiConsumes,
    ApiConflictResponse,
} from '@nestjs/swagger';
import { ResponseErrorDto } from '../../shared/dto/response-error.dto';
import { ResponseBadRequestErrorDto } from '../../shared/dto/response-bad-request-error.dto';
import { FoodAndDrinkOwnerInfoPresenter } from './presenters/food-and-drink-owner-info.presenter';
import { OptionalAuthGuard } from '../../shared/guards/optional-auth.guard';
import type { IOptionalUserRequest } from '../auth/interfaces/IOptionalUserRequest';
import { FoodAndDrinkFavouritesService } from '../food-and-drink-favourites/food-and-drink-favourites.service';
import { FoodAndDrinkStatisticsService } from '../food-and-drink-statistics/food-and-drink-statistics.service';
import { ResponseFindStatisticByFoodAndDrinkDto } from '../food-and-drink-statistics/dto/response-find-statistic-by-food-and-drink.dto';
import { ResponseFoodAndDrinkFindViewsDto } from '../food-and-drinks-views/dto/response-food-and-drink-find-views.dto';
import { QueryFoodAndDrinkViewsDto } from '../food-and-drinks-views/dto/query-food-and-drink-views.dto';
import { FoodAndDrinkViewsService } from '../food-and-drinks-views/food-and-drink-views.service';
import {
    FoodAndDrinkTypeTranslate,
    type FoodAndDrinkTypeTranslateType,
} from './constants/FoodAndDrinkTypeTranslate';
import {
    FoodAndDrinkFeaturesTranslate,
    type FoodAndDrinkFeaturesTranslateType,
} from './constants/FoodAndDrinkFeaturesTranslate';
import { ReviewsService } from '../reviews/reviews.service';
import { Review } from '../reviews/entities/review.entity';
import { ReviewStatisticsPresenter } from '../reviews/presenter/ReviewStatisticsPresenter';
import { ReviewQueryDto } from '../reviews/dto/review-query-dto';
import { ContactManagerDto } from './dto/contact-manager.dto';
import { QueryCommentDto } from '../comments/dto/query-comment.dto';
import { CommentsService } from '../comments/comments.service';
import { Comment } from '../comments/entities/comment.entity';
import { CommentFoodAndDrinkPresenter } from '../comments/presenters/comment-food-and-drink.presenter';
import { NewsService } from '../news/news.service';
import { News } from '../news/entities/news.entity';
import { QueryNewsDto } from '../news/dto/query-news.dto';

@ApiTags('Заклади харчування')
@Controller('food-and-drinks')
export class FoodAndDrinkController {
    constructor(
        private readonly foodAndDrinkService: FoodAndDrinkService,
        private readonly foodAndDrinkFavouritesService: FoodAndDrinkFavouritesService,
        private readonly foodAndDrinkStatisticService: FoodAndDrinkStatisticsService,
        private readonly foodAndDrinkViewsService: FoodAndDrinkViewsService,
        private readonly reviewsService: ReviewsService,
        private readonly commentsService: CommentsService,
        private readonly newsService: NewsService,
    ) {}

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Створення',
        description:
            'Дозволяє авторизованому користувачеві створити новий заклад харчування. Закладу буде автоматично привласнено статус "В очікуванні" доки його не схвалить модератор.',
    })
    @ApiCreatedResponse({
        description: 'Заклад успішно створено',
        type: FoodAndDrinkResponseFindPresenter,
    })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseBadRequestErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @UseGuards(AuthGuard('jwt'))
    @Post()
    @SerializeOptions({
        type: FoodAndDrinkOwnerInfoPresenter,
        excludeExtraneousValues: true,
    })
    async create(
        @Body() createFoodAndDrinkDto: CreateFoodAndDrinkDto,
        @Req() req: IUserRequest,
    ): Promise<FoodAndDrink> {
        return await this.foodAndDrinkService.create(
            createFoodAndDrinkDto,
            req.user.data,
        );
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Підтвердження електронної пошти закладу',
        description: 'Підтвердження електронної пошти закладу',
    })
    @ApiNoContentResponse({
        description: 'Пошту закладу успішно підтверджено',
    })
    @ApiUnauthorizedResponse({
        description: 'Заклад підтверджено',
        type: ResponseErrorDto,
    })
    @ApiConflictResponse({
        description: 'Заклад вже підтверджено',
        type: ResponseErrorDto,
    })
    @Post('/confirm/:token')
    @HttpCode(HttpStatus.NO_CONTENT)
    async confirmEmail(@Param('token') token: string): Promise<void> {
        await this.foodAndDrinkService.confirmFoodAndDrinkEmail(token);
    }

    @ApiOperation({
        summary: 'Пошук активних',
        description:
            'Отримує список активних закладів харчування з підтримкою фільтрації, сортування та пошуку за різними критеріями.',
    })
    @ApiOkResponse({
        description: 'Успішно отримано список закладів',
        type: FoodAndDrinkResponseFindPresenter,
    })
    @Get()
    @SerializeOptions({
        type: FoodAndDrinkResponseFindPresenter,
        excludeExtraneousValues: true,
    })
    async find(
        @Query() query: FoodAndDrinkQueryDto,
    ): Promise<{ data: FoodAndDrink[]; total: number; totalPages: number }> {
        const [foodAndDrinks, total, totalPages] =
            await this.foodAndDrinkService.find(query, {
                status: FoodAndDrinkStatusEnum.ACTIVE,
            });
        return { data: foodAndDrinks, ...query, total, totalPages };
    }

    @ApiOperation({
        summary: 'Об`єкт типів з перекладом',
        description: 'Отримує об`єкт типів з перекладом',
    })
    @ApiOkResponse({
        description: 'Успішно отримано об`єкт типів з перекладом',
        example: FoodAndDrinkTypeTranslate,
    })
    @Get('/types')
    findTypes(): FoodAndDrinkTypeTranslateType {
        return FoodAndDrinkTypeTranslate;
    }

    @ApiOperation({
        summary: 'Об`єкт особливостей з перекладом',
        description: 'Отримує об`єкт особливостей з перекладом',
    })
    @ApiOkResponse({
        description: 'Успішно отримано список особливості закладу',
        example: FoodAndDrinkFeaturesTranslate,
    })
    @Get('/features')
    findFeatures(): FoodAndDrinkFeaturesTranslateType {
        return FoodAndDrinkFeaturesTranslate;
    }

    @ApiOperation({
        summary: 'Отримання інформації',
        description:
            'Отримує детальну інформацію про конкретний активний заклад харчування за його ідентифікатором.',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID ідентифікатор закладу',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiOkResponse({
        description: 'Успішно отримано інформацію про заклад',
        type: FoodAndDrinkInfoPresenter,
    })
    @ApiNotFoundResponse({
        description: 'Заклад не знайдено',
        type: ResponseErrorDto,
    })
    @UseGuards(OptionalAuthGuard)
    @Get(':id')
    @SerializeOptions({
        type: FoodAndDrinkInfoPresenter,
        excludeExtraneousValues: true,
    })
    async findById(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        id: string,
        @Req() req: IOptionalUserRequest,
    ): Promise<FoodAndDrink> {
        const userId = req.user?.data.id;
        return await this.foodAndDrinkService.findActiveById(id, userId);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Оновлення інформації',
        description:
            'Дозволяє власнику або менеджеру закладу оновити його інформацію. Стає можливим тільки для користувача, який є власником або менеджером закладу.',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID ідентифікатор закладу',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiNoContentResponse({
        description: 'Заклад успішно оновлено',
    })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseBadRequestErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Немає прав для редагування цього закладу',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Заклад не знайдено',
        type: ResponseErrorDto,
    })
    @UseGuards(AuthGuard('jwt'), CanManageOrCheckStatisticsFoodAndDrinkGuard)
    @Patch(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        id: string,
        @Body() updateFoodAndDrinkDto: UpdateFoodAndDrinkDto,
    ): Promise<void> {
        await this.foodAndDrinkService.update(id, updateFoodAndDrinkDto);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Повне видалення',
        description:
            "Дозволяє власнику закладу видалити його. При видаленні закладу видаляються також всі пов'язані дані (зображення, теги, статистика тощо).",
    })
    @ApiParam({
        name: 'id',
        description: 'UUID ідентифікатор закладу',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiNoContentResponse({
        description: 'Заклад успішно видалено',
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Немає прав для видалення цього закладу',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Заклад не знайдено',
        type: ResponseErrorDto,
    })
    @UseGuards(AuthGuard('jwt'), CanManageOrCheckStatisticsFoodAndDrinkGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        id: string,
    ): Promise<void> {
        await this.foodAndDrinkService.delete(id);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Завантаження зображень',
        description:
            'Дозволяє власнику завантажити зображення закладу. Підтримуються формати: PNG, JPEG, JPG. Максимальний розмір файлу: 1 МБ.',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID ідентифікатор закладу',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiConsumes('multipart/form-data')
    @ApiNoContentResponse({
        description: 'Зображення успішно завантажено',
    })
    @ApiBadRequestResponse({
        description: 'Невалідний формат або розмір файлу',
        type: ResponseErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Немає прав для завантаження зображень цього закладу',
        type: ResponseErrorDto,
    })
    @UseGuards(AuthGuard('jwt'), CanManageOrCheckStatisticsFoodAndDrinkGuard)
    @UseInterceptors(FilesInterceptor('images'))
    @Post(':id/images')
    @HttpCode(HttpStatus.NO_CONTENT)
    async uploadImages(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        id: string,
        @UploadedFiles(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: /^image\/(png|jpeg|jpg)$/,
                    errorMessage: (ctx) =>
                        `Недопустиме розширення для файлу ${(ctx?.file as Express.Multer.File).originalname}. Дозволені типи: png, jpeg або jpg.`,
                })
                .addMaxSizeValidator({
                    maxSize: 1024 * 1024,
                    errorMessage: (ctx) =>
                        `Недопустимий розмір для файлу ${(ctx?.file as Express.Multer.File).originalname}. Максимальний розмір: 1 Мб.`,
                })
                .build({
                    fileIsRequired: false,
                }),
        )
        files: Express.Multer.File[],
    ): Promise<void> {
        await this.foodAndDrinkService.uploadImages(id, files);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Видалення зображень',
        description:
            'Дозволяє власнику видалити вибрані зображення закладу. Передайте масив URL-адрес зображень для видалення.',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID ідентифікатор закладу',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiNoContentResponse({
        description: 'Зображення успішно видалено',
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Немає прав для видалення зображень цього закладу',
        type: ResponseErrorDto,
    })
    @UseGuards(AuthGuard('jwt'), CanManageOrCheckStatisticsFoodAndDrinkGuard)
    @Post(':id/images/remove')
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeImages(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        id: string,
        @Body()
        removeImagesFoodAndDrinkDto: RemoveImagesFoodAndDrinkDto,
    ): Promise<void> {
        await this.foodAndDrinkService.removeImages(
            id,
            removeImagesFoodAndDrinkDto,
        );
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Додати або видалити з улюблених',
        description: 'Додає або видаляє заклад з улюблених користувача',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID ідентифікатор закладу',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiNoContentResponse({
        description:
            'Успішно додано або видалено заклад з улюблених користувачів',
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @UseGuards(AuthGuard('jwt'))
    @Post(':id/favourites')
    @HttpCode(HttpStatus.NO_CONTENT)
    async toggleFavourite(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        foodAndDrinkId: string,
        @Req() req: IUserRequest,
    ): Promise<void> {
        const user = req.user;
        await this.foodAndDrinkFavouritesService.toggleFavourite(
            user.data.id,
            foodAndDrinkId,
        );
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Загальна статистика закладу',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID ідентифікатор закладу',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiOkResponse({
        description: 'Успішно отримано статистику закладу',
        type: ResponseFindStatisticByFoodAndDrinkDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Користувач не є власником цього закладу',
        type: ResponseErrorDto,
    })
    @UseGuards(AuthGuard('jwt'), CanManageOrCheckStatisticsFoodAndDrinkGuard)
    @Get(':id/statistics')
    @HttpCode(HttpStatus.OK)
    async findStatistics(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        foodAndDrinkId: string,
    ): Promise<ResponseFindStatisticByFoodAndDrinkDto> {
        return await this.foodAndDrinkStatisticService.findOneByFoodAndDrink(
            foodAndDrinkId,
        );
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Статистика переглядів за певний період часу',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID ідентифікатор закладу',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiOkResponse({
        description:
            'Успішно отримано статистику переглядів за певний період часу',
        type: ResponseFoodAndDrinkFindViewsDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Користувач не є власником цього закладу',
        type: ResponseErrorDto,
    })
    @UseGuards(AuthGuard('jwt'), CanManageOrCheckStatisticsFoodAndDrinkGuard)
    @Get(':id/views')
    @HttpCode(HttpStatus.OK)
    async findViews(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        foodAndDrinkId: string,
        @Query() query: QueryFoodAndDrinkViewsDto,
        @Req() req: IUserRequest,
    ): Promise<ResponseFoodAndDrinkFindViewsDto> {
        const user = req.user;
        return await this.foodAndDrinkViewsService.findViews(
            foodAndDrinkId,
            user.role,
            query,
        );
    }

    @ApiOperation({
        summary: 'Відгуки про закладу',
        description:
            'Отримує список всіх відгуків про закладу з підтримкою фільтрації та сортування.',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID ідентифікатор закладу',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiOkResponse({
        description: 'Успішно отримано список відгуків про закладу',
        type: ReviewWithOwnerFindPresenter,
    })
    @ApiBadRequestResponse({
        description: 'Помилка валідації даних',
        type: ResponseBadRequestErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Заклад не знайдено',
        type: ResponseErrorDto,
    })
    @Get(':id/reviews')
    @SerializeOptions({
        type: ReviewWithOwnerFindPresenter,
        excludeExtraneousValues: true,
    })
    async findReviews(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        foodAndDrinkId: string,
        @Query() query: ReviewQueryDto,
    ): Promise<{ data: Review[]; total: number; totalPages: number }> {
        return await this.reviewsService.getFoodAndDrinkReviews(
            foodAndDrinkId,
            query,
        );
    }

    @ApiOperation({
        summary: 'Статистика відгуків',
        description: 'Отримує статистику розподілу відгуків за рейтингами.',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID ідентифікатор закладу',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiOkResponse({
        description: 'Успішно отримано статистику розподілу відгуків',
        type: ReviewStatisticsFindPresenter,
    })
    @ApiNotFoundResponse({
        description: 'Заклад не знайдено',
        type: ResponseErrorDto,
    })
    @Get(':id/reviews/statistics')
    @HttpCode(HttpStatus.OK)
    @SerializeOptions({
        type: ReviewStatisticsFindPresenter,
        excludeExtraneousValues: true,
    })
    async findReviewStatistics(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        id: string,
    ): Promise<{ data: ReviewStatisticsPresenter[]; total: number }> {
        return await this.reviewsService.getReviewStatistics(id);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Контакт з менеджером закладу',
        description:
            'Дозволяє користувачу відправити повідомлення менеджеру закладу харчування.',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID ідентифікатор закладу',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiNoContentResponse({
        description: 'Повідомлення успішно відправлено',
    })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseBadRequestErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Заклад не знайдено',
        type: ResponseErrorDto,
    })
    @Post(':id/contact')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(OptionalAuthGuard)
    async contact(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        foodAndDrinkId: string,
        @Body() contactManagerDto: ContactManagerDto,
        @Req() req: IOptionalUserRequest,
    ): Promise<void> {
        const user = req.user ? req.user.data : null;
        await this.foodAndDrinkService.contact(
            contactManagerDto,
            foodAndDrinkId,
            user,
        );
    }

    @ApiOperation({
        summary: 'Коментарі про заклад',
        description:
            'Отримує список всіх коментарів про заклад з підтримкою фільтрації та сортування.',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID ідентифікатор закладу',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiOkResponse({
        description: 'Успішно отримано список коментарів про заклад',
        type: CommentFoodAndDrinkPresenter,
    })
    @ApiBadRequestResponse({
        description: 'Помилка валідації даних',
        type: ResponseBadRequestErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Заклад не знайдено',
        type: ResponseErrorDto,
    })
    @Get(':id/comments')
    @SerializeOptions({
        type: CommentFoodAndDrinkFindPresenter,
        excludeExtraneousValues: true,
    })
    async findComments(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        foodAndDrinkId: string,
        @Query() query: QueryCommentDto,
    ): Promise<{ data: Comment[]; total: number; totalPages: number }> {
        return await this.commentsService.find(query, { foodAndDrinkId });
    }

    @ApiOperation({
        summary: 'Новини закладу',
        description:
            'Отримує список всіх новин закладу з підтримкою фільтрації та сортування.',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID ідентифікатор закладу',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiOkResponse({
        description: 'Успішно отримано список новин закладу',
        type: CommentFoodAndDrinkPresenter,
    })
    @ApiBadRequestResponse({
        description: 'Помилка валідації даних',
        type: ResponseBadRequestErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Заклад не знайдено',
        type: ResponseErrorDto,
    })
    @Get(':id/news')
    @SerializeOptions({
        type: FoodAndDrinkNewsFindPresenter,
        excludeExtraneousValues: true,
    })
    async findNews(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        foodAndDrinkId: string,
        @Query() query: QueryNewsDto,
    ): Promise<{ data: News[]; total: number; totalPages: number }> {
        return await this.newsService.find(query, { foodAndDrinkId });
    }
}
