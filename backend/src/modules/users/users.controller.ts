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

@ApiTags('Користувачі')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly foodAndDrinkService: FoodAndDrinkService,
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
        type: UserPresenter, // 2. Вказуємо, яку схему (клас) використати
        excludeExtraneousValues: true, // 3. Кажемо ігнорувати все, що без @Expose()
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
    @ApiOkResponse({
        description: 'Профіль успішно оновлено',
        type: User,
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
    @SerializeOptions({
        type: UserPresenter,
        excludeExtraneousValues: true,
    })
    async updateMe(
        @Request() req: IUserRequest,
        @Body() updateMeDto: UpdateMeDto,
    ): Promise<User> {
        return await this.usersService.updateByEntity(
            req.user.data,
            updateMeDto,
        );
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
        await this.usersService.softDeleteById(user.data.id, user.role);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Отримання інформації про свій заклад',
        description:
            'Дозволяє власнику закладу отримати детальну інформацію про свій заклад харчування.',
    })
    @ApiOkResponse({
        description: 'Успіх',
        type: FoodAndDrink,
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
        return await this.foodAndDrinkService.findOneByOwner(req.user.data);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Завантаження фотографії профілю',
        description:
            'Дозволяє користувачу завантажити або оновити фотографію профілю. Підтримуються формати: PNG, JPEG, JPG. Максимальний розмір: 1 МБ.',
    })
    @ApiConsumes('multipart/form-data')
    @ApiOkResponse({
        description: 'Фотографія успішно завантажено',
        type: User,
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
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('photo'))
    @SerializeOptions({
        type: UserPresenter,
        excludeExtraneousValues: true,
    })
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
    ): Promise<User> {
        return await this.usersService.uploadPhoto(file, req.user.data);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Видалення фотографії профілю',
        description: 'Дозволяє користувачу видалити свою фотографію профілю.',
    })
    @ApiOkResponse({
        description: 'Фотографія успішно видалено',
        type: User,
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
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    @SerializeOptions({
        type: UserPresenter,
        excludeExtraneousValues: true,
    })
    async deletePhoto(@Req() req: IUserRequest): Promise<User> {
        return await this.usersService.deletePhoto(req.user.data);
    }
}
