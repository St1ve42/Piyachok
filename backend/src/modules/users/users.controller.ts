import {
    Controller,
    Get,
    UseGuards,
    Request,
    Body,
    Patch,
    Delete,
    HttpCode,
    HttpStatus,
    Post,
    UploadedFile,
    UseInterceptors,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
    Req,
    SerializeOptions,
    Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import type { IUserRequest } from '../auth/interfaces/IUserRequest';
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiCookieAuth,
    ApiForbiddenResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiUnauthorizedResponse,
    ApiTags,
    ApiConsumes,
} from '@nestjs/swagger';
import { ResponseErrorDto } from '../../shared/dto/response-error.dto';
import { ResponseBadRequestErrorDto } from '../../shared/dto/response-bad-request-error.dto';
import { UpdateMeDto } from './dto/update-me.dto';
import { FoodAndDrinkService } from '../food-and-drink/food-and-drink.service';
import { FoodAndDrink } from '../food-and-drink/entities/food-and-drink.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { FoodAndDrinkOwnerInfoPresenter } from '../food-and-drink/presenters/food-and-drink-owner-info.presenter';
import { UserPresenter } from './presenters/user.presenter';
import { FoodAndDrinkFavouritesService } from '../food-and-drink-favourites/food-and-drink-favourites.service';
import {
    FoodAndDrinkResponseFindPresenter,
    ReviewWithFoodAndDrinkFindPresenter,
} from '../../shared/presenters/find.presenter';
import { BaseQueryDto } from '../../shared/dto/base-query.dto';
import { ReviewsService } from '../reviews/reviews.service';
import { Review } from '../reviews/entities/review.entity';
import { UserReviewQueryDto } from '../reviews/dto/user-review-query.dto';

@ApiTags('Користувачі')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly foodAndDrinkService: FoodAndDrinkService,
        private readonly foodAndDrinkFavouritesService: FoodAndDrinkFavouritesService,
        private readonly reviewsService: ReviewsService,
    ) {}

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Отримання інформації про поточного користувача',
        description:
            'Повертає детальну інформацію про авторизованого користувача, включаючи його роль, місто, регіон та інші дані профілю.',
    })
    @ApiOkResponse({
        description: 'Успіх',
        type: UserPresenter,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @Get('/me')
    @UseGuards(AuthGuard('jwt'))
    @SerializeOptions({
        type: UserPresenter,
        excludeExtraneousValues: true,
    })
    me(@Request() req: IUserRequest): User {
        return req.user.data;
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Оновлення профілю користувача',
        description:
            "Дозволяє користувачу оновити інформацію про себе: ім'я, прізвище, вік, місто, регіон, стать та телефон.",
    })
    @ApiNoContentResponse({
        description: 'Профіль успішно оновлено',
    })
    @ApiBadRequestResponse({
        description: 'Помилка валідації даних',
        type: ResponseBadRequestErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiConflictResponse({
        description: 'Конфлікт даних (наприклад, місто не належить регіону)',
        type: ResponseErrorDto,
    })
    @Patch('/me')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateMe(
        @Request() req: IUserRequest,
        @Body() updateMeDto: UpdateMeDto,
    ): Promise<void> {
        await this.usersService.updateByEntity(req.user.data, updateMeDto);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Видалення акаунту',
        description:
            "Дозволяє користувачу видалити свій акаунт. При видаленні відбувається м'яке видалення (soft delete) для збереження історії даних.",
    })
    @ApiNoContentResponse({
        description: 'Акаунт успішно видалено',
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Заборонено видаляти цей акаунт',
        type: ResponseErrorDto,
    })
    @Delete('/me')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard('jwt'))
    async deleteMe(@Request() req: IUserRequest): Promise<void> {
        const user = req.user;
        await this.usersService.deleteMe(user.data.id, user.role);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Отримання інформації про свій заклад',
        description:
            'Дозволяє власнику закладу отримати детальну інформацію про свій заклад харчування.',
    })
    @ApiOkResponse({
        description: 'Успіх',
        type: FoodAndDrinkOwnerInfoPresenter,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Закладу не знайдено для цього користувача',
        type: ResponseErrorDto,
    })
    @Get('/me/food-and-drink')
    @UseGuards(AuthGuard('jwt'))
    @SerializeOptions({
        type: FoodAndDrinkOwnerInfoPresenter,
        excludeExtraneousValues: true,
    })
    async myFoodAndDrink(@Request() req: IUserRequest): Promise<FoodAndDrink> {
        return await this.foodAndDrinkService.findOneByOwner(req.user.data.id);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Завантаження фотографії профілю',
        description:
            'Дозволяє користувачу завантажити або оновити фотографію профілю. Підтримуються формати: PNG, JPEG, JPG. Максимальний розмір: 1 МБ.',
    })
    @ApiConsumes('multipart/form-data')
    @ApiNoContentResponse({
        description: 'Фотографію успішно завантажено',
    })
    @ApiBadRequestResponse({
        description: 'Невалідний формат або розмір файлу',
        type: ResponseErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @Post('/me/photo')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('photo'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async uploadPhoto(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 1024 * 1024,
                        errorMessage: `Недопустимий розмір файлу. Максимальний розмір: 1 Мб`,
                    }),
                    new FileTypeValidator({
                        fileType: /^image\/(png|jpeg|jpg)$/,
                        errorMessage:
                            'Недопустиме розширення файлу. Дозволені типи: png, jpeg або jpg',
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
        @Req() req: IUserRequest,
    ): Promise<void> {
        await this.usersService.uploadPhoto(file, req.user.data);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Видалення фотографії профілю',
        description: 'Дозволяє користувачу видалити свою фотографію профілю.',
    })
    @ApiNoContentResponse({
        description: 'Фотографію успішно видалено',
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Фотографія не знайдена',
        type: ResponseErrorDto,
    })
    @Delete('/me/photo')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard('jwt'))
    async deletePhoto(@Req() req: IUserRequest): Promise<void> {
        await this.usersService.deletePhoto(req.user.data, 'user');
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Список уподобань',
    })
    @ApiNoContentResponse({
        type: FoodAndDrinkResponseFindPresenter,
        description: 'Список успішно отримано',
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Користувач не має уподобань',
        type: ResponseErrorDto,
    })
    @Get('/me/favourites')
    @UseGuards(AuthGuard('jwt'))
    @SerializeOptions({
        type: FoodAndDrinkResponseFindPresenter,
        excludeExtraneousValues: true,
    })
    async myFavourites(
        @Query() query: BaseQueryDto,
        @Req() req: IUserRequest,
    ): Promise<{ data: FoodAndDrink[]; total: number; totalPages: number }> {
        return await this.foodAndDrinkFavouritesService.findMyFavourites(
            req.user.data.id,
            query,
        );
    }

    @Get('/me/reviews')
    @UseGuards(AuthGuard('jwt'))
    @SerializeOptions({
        type: ReviewWithFoodAndDrinkFindPresenter,
        excludeExtraneousValues: true,
    })
    async myReviews(
        @Query() query: UserReviewQueryDto,
        @Req() req: IUserRequest,
    ): Promise<{ data: Review[]; total: number; totalPages: number }> {
        return await this.reviewsService.findMyReviews(req.user.data.id, query);
    }
}
