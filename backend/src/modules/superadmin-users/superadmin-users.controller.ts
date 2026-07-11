import {
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    HttpCode,
    HttpStatus,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Patch,
    Post,
    Query,
    Request,
    SerializeOptions,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiCookieAuth,
    ApiUnauthorizedResponse,
    ApiForbiddenResponse,
    ApiNoContentResponse,
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiConsumes,
} from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { IsSuperadminGuard } from '../../shared/guards/is-superadmin.guard';
import { SuperadminUserQueryDto } from './dto/superadmin-user-query.dto';
import { ResponseErrorDto } from '../../shared/dto/response-error.dto';
import { ProtectedUserFindPresenter } from '../../shared/presenters/find.presenter';
import type { IUserRequest } from '../auth/interfaces/IUserRequest';
import { UserIdValidationPipe } from '../../shared/pipes/id-validation.pipe';
import { UserBodyValidationPipe } from '../../shared/pipes/body-validation.pipe';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { ResponseBadRequestErrorDto } from '../../shared/dto/response-bad-request-error.dto';
import { UserPresenter } from '../users/presenters/user.presenter';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Адміністрування користувачів (Суперадмін)')
@UseGuards(AuthGuard('jwt'), IsSuperadminGuard)
@Controller()
export class SuperadminUsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Отримання списку всіх користувачів',
        description:
            'Дозволяє суперадміністратору переглядати список всіх користувачів в системі з можливістю фільтрації та пошуку.',
    })
    @ApiOkResponse({
        description: 'Успішно отримано список користувачів',
        type: ProtectedUserFindPresenter,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Тільки суперадміністратори мають доступ до цього ресурсу',
        type: ResponseErrorDto,
    })
    @Get()
    @SerializeOptions({
        type: ProtectedUserFindPresenter,
        excludeExtraneousValues: true,
    })
    async find(
        @Query() query: SuperadminUserQueryDto,
    ): Promise<{ data: User[]; total: number; totalPages: number }> {
        const [users, total, totalPages] = await this.usersService.find(query);
        return { data: users, ...query, total, totalPages };
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Отримання детальної інформації про користувача',
        description:
            'Дозволяє суперадміністратору отримати детальну інформацію про користувача',
    })
    @ApiOkResponse({
        type: UserPresenter,
        description: 'Успішно отримано',
    })
    @ApiBadRequestResponse({
        type: ResponseBadRequestErrorDto,
        description: 'Помилка валідації даних',
    })
    @ApiNotFoundResponse({
        type: ResponseErrorDto,
        description: 'Заклад не знайдено',
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Тільки суперадміністратори мають доступ до цього ресурсу',
        type: ResponseErrorDto,
    })
    @Get(':id')
    @SerializeOptions({
        type: UserPresenter,
        excludeExtraneousValues: true,
    })
    @UseGuards(AuthGuard('jwt'))
    async findById(
        @Param('id', UserIdValidationPipe, UserBodyValidationPipe) id: string,
    ): Promise<User> {
        return (await this.usersService.findById(id, {
            ownerOf: true,
        })) as User;
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Оновлення користувача',
        description: 'Дозволяє суперадміністратору оновити користувача',
    })
    @ApiNoContentResponse({
        description: 'Успішно оновлено',
    })
    @ApiBadRequestResponse({
        type: ResponseBadRequestErrorDto,
        description: 'Помилка валідації даних',
    })
    @ApiNotFoundResponse({
        type: ResponseErrorDto,
        description: 'Заклад не знайдено',
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Тільки суперадміністратори мають доступ до цього ресурсу',
        type: ResponseErrorDto,
    })
    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(
        @Param('id', UserIdValidationPipe, UserBodyValidationPipe) id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<void> {
        await this.usersService.updateById(id, updateUserDto);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'М`яке видалення користувача',
        description: 'Дозволяє суперадміністратору м`яко видалити користувача',
    })
    @ApiNoContentResponse({
        description: 'Успішно видалено',
    })
    @ApiBadRequestResponse({
        type: ResponseBadRequestErrorDto,
        description: 'Помилка валідації даних',
    })
    @ApiNotFoundResponse({
        type: ResponseErrorDto,
        description: 'Заклад не знайдено',
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Тільки суперадміністратори мають доступ до цього ресурсу',
        type: ResponseErrorDto,
    })
    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Request() req: IUserRequest,
        @Param('id', UserIdValidationPipe, UserBodyValidationPipe) id: string,
    ): Promise<void> {
        const user = req.user;
        await this.usersService.softDeleteById(id, user.data.id);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Завантаження фотографії користувача',
        description:
            'Дозволяє суперадміну змінювати фотографію профілю. Підтримуються формати: PNG, JPEG, JPG. Максимальний розмір: 1 МБ.',
    })
    @ApiConsumes('multipart/form-data')
    @ApiNoContentResponse({
        description: 'Фотографію успішно завантажено',
    })
    @ApiBadRequestResponse({
        type: ResponseBadRequestErrorDto,
        description: 'Помилка валідації даних',
    })
    @ApiNotFoundResponse({
        type: ResponseErrorDto,
        description: 'Користувача або заклад не знайдено',
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @Post(':id/photo')
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
        @Param('id', UserIdValidationPipe, UserBodyValidationPipe) id: string,
    ): Promise<void> {
        const user = (await this.usersService.findById(id)) as User;
        await this.usersService.uploadPhoto(file, user);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Видалення фотографії користувача',
        description: 'Дозволяє суперадміну видалити фотографію користувача.',
    })
    @ApiNoContentResponse({
        description: 'Фотографію успішно видалено',
    })
    @ApiBadRequestResponse({
        type: ResponseBadRequestErrorDto,
        description: 'Помилка валідації даних',
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        type: ResponseErrorDto,
        description: 'Користувача або заклад не знайдено',
    })
    @ApiNotFoundResponse({
        description: 'Фотографія не знайдена',
        type: ResponseErrorDto,
    })
    @Delete(':id/photo')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard('jwt'))
    async deletePhoto(
        @Param('id', UserIdValidationPipe, UserBodyValidationPipe) id: string,
    ): Promise<void> {
        const user = (await this.usersService.findById(id)) as User;
        await this.usersService.deletePhoto(user, 'superadmin');
    }
}
