import {
    Controller,
    Get,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    Post,
    UseGuards,
    Req,
    UploadedFile,
    ParseFilePipeBuilder,
    HttpCode,
    HttpStatus,
    SerializeOptions,
    UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { UpdateNewsDto } from './dto/update-news.dto';
import { QueryNewsDto } from './dto/query-news.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateNewsDto } from './dto/create-news.dto';
import type { IUserRequest } from '../auth/interfaces/IUserRequest';
import { News } from './entities/news.entity';
import { NewsIdValidationPipe } from '../../shared/pipes/id-validation.pipe';
import { NewsBodyValidationPipe } from '../../shared/pipes/body-validation.pipe';
import { CanManageNewsGuard } from '../../shared/guards/can-manage-resource.guard';
import { newsPhotoConfiguration } from './constants/news-photo.configuration';
import type { INewsRequest } from './interface/INewsRequest';
import { GeneralNewsFindPresenter } from '../../shared/presenters/find.presenter';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    ApiTags,
    ApiOperation,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiNoContentResponse,
    ApiParam,
    ApiBody,
    ApiConsumes,
    ApiUnauthorizedResponse,
    ApiBadRequestResponse,
    ApiCookieAuth,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
} from '@nestjs/swagger';
import { NewsByIdPresenter } from './presenter/NewsByIdPresenter';
import { ICreateNewsPresenter } from './presenter/ICreateNewsPresenter';
import { ResponseBadRequestErrorDto } from '../../shared/dto/response-bad-request-error.dto';
import { ResponseErrorDto } from '../../shared/dto/response-error.dto';

@ApiTags('Новини')
@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @ApiCookieAuth('accessToken')
    @ApiOperation({ summary: 'Створення', description: 'Створити новину' })
    @ApiCreatedResponse({
        description: 'Новина створена',
        type: ICreateNewsPresenter,
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
        description: 'Заборонено',
        type: ResponseErrorDto,
    })
    @Post()
    @UseGuards(AuthGuard('jwt'))
    @SerializeOptions({
        type: ICreateNewsPresenter,
        excludeExtraneousValues: true,
    })
    create(
        @Body() createNewsDto: CreateNewsDto,
        @Req() req: IUserRequest,
    ): Promise<News> {
        return this.newsService.create(createNewsDto, req.user.data.id);
    }

    @ApiOperation({ summary: 'Пошук', description: 'Отримати список новин' })
    @ApiOkResponse({
        description: 'Список новин',
        type: GeneralNewsFindPresenter,
    })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseBadRequestErrorDto,
    })
    @Get()
    @SerializeOptions({
        type: GeneralNewsFindPresenter,
        excludeExtraneousValues: true,
    })
    find(@Query() query: QueryNewsDto): Promise<{
        data: News[];
        total: number;
        totalPages: number;
    }> {
        return this.newsService.find(query);
    }

    @ApiOperation({
        summary: 'Отримати за ID',
        description: 'Отримати повну інформацію про новину',
    })
    @ApiOkResponse({ description: 'Деталі новини', type: NewsByIdPresenter })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseBadRequestErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Новину не знайдено',
        type: ResponseErrorDto,
    })
    @ApiParam({
        name: 'id',
        description: 'ID новини',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    })
    @Get(':id')
    @SerializeOptions({
        type: NewsByIdPresenter,
        excludeExtraneousValues: true,
    })
    findOne(
        @Param('id', NewsIdValidationPipe, NewsBodyValidationPipe) id: string,
    ) {
        return this.newsService.findById(id);
    }

    @ApiOperation({ summary: 'Оновлення', description: 'Оновити новину' })
    @ApiNoContentResponse({ description: 'Новина оновлена' })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseBadRequestErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Заборонено',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Новину не знайдено',
        type: ResponseErrorDto,
    })
    @ApiParam({
        name: 'id',
        description: 'ID новини',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    })
    @Patch(':id')
    @UseGuards(AuthGuard('jwt'), CanManageNewsGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
        return this.newsService.update(id, updateNewsDto);
    }

    @ApiOperation({ summary: 'Видалення', description: 'Видалити новину' })
    @ApiNoContentResponse({ description: 'Новина видалена' })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseBadRequestErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Заборонено',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Новину не знайдено',
        type: ResponseBadRequestErrorDto,
    })
    @ApiParam({
        name: 'id',
        description: 'ID новини',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    })
    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), CanManageNewsGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: string) {
        return this.newsService.delete(id);
    }

    @ApiOperation({
        summary: 'Завантажити фото',
        description: 'Завантажити фото для новини',
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: { photo: { type: 'string', format: 'binary' } },
        },
    })
    @ApiNoContentResponse({ description: 'Фото успішно завантажено' })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseBadRequestErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Заборонено',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Новину не знайдено',
        type: ResponseErrorDto,
    })
    @Post(':id/photo')
    @UseGuards(AuthGuard('jwt'), CanManageNewsGuard)
    @UseInterceptors(FileInterceptor('photo'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async uploadPhoto(
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: newsPhotoConfiguration.fileType,
                    errorMessage: (ctx) =>
                        `Недопустиме розширення для файлу ${(ctx?.file as Express.Multer.File).originalname}. Дозволені типи: png, jpeg або jpg.`,
                })
                .addMaxSizeValidator({
                    maxSize: newsPhotoConfiguration.maxSize,
                    errorMessage: (ctx) =>
                        `Недопустимий розмір для файлу ${(ctx?.file as Express.Multer.File).originalname}. Максимальний розмір: ${newsPhotoConfiguration.maxSize / 1024 / 1024} МБ.`,
                })
                .build(),
        )
        uploadedPhoto: Express.Multer.File,
        @Req() req: INewsRequest,
    ): Promise<void> {
        await this.newsService.uploadPhoto(req.news, uploadedPhoto);
    }

    @ApiOperation({
        summary: 'Видалити фото',
        description: 'Видалити фото новини',
    })
    @ApiNoContentResponse({ description: 'Фото видалено' })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseBadRequestErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Заборонено',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Новину не знайдено',
        type: ResponseErrorDto,
    })
    @Delete(':id/photo')
    @UseGuards(AuthGuard('jwt'), CanManageNewsGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletePhoto(@Req() req: INewsRequest): Promise<void> {
        await this.newsService.deletePhoto(req.news);
    }
}
