import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    HttpCode,
    HttpStatus,
    UseGuards,
    Req,
    SerializeOptions,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiOkResponse,
    ApiCreatedResponse,
    ApiParam,
    ApiNoContentResponse,
    ApiBadRequestResponse,
    ApiUnauthorizedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiConflictResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PiyachokService } from './piyachok.service';
import { CreatePiyachokDto } from './dto/create-piyachok.dto';
import { UpdatePiyachokDto } from './dto/update-piyachok.dto';
import { Piyachok } from './entities/piyachok.entity';
import type { IUserRequest } from '../auth/interfaces/IUserRequest';
import { QueryBaseDto } from '../../shared/dto/query-base.dto';
import { PiyachokIdValidationPipe } from '../../shared/pipes/id-validation.pipe';
import { PiyachokBodyValidationPipe } from '../../shared/pipes/body-validation.pipe';
import { CanManagePiyachokGuard } from '../../shared/guards/can-manage-resource.guard';
import {
    PiyachokFindPresenter,
    PiyachokRepliesFindPresenter,
} from '../../shared/presenters/find.presenter';
import { PiyachokDetailPresenter } from './presenters';
import { PiyachokPresenter } from './presenters/piyachok.presenter';
import { ResponseBadRequestErrorDto } from '../../shared/dto/response-bad-request-error.dto';
import { ResponseErrorDto } from '../../shared/dto/response-error.dto';
import { PiyachokRepliesService } from '../piyachok-replies/piyachok-replies.service';

@ApiTags('Piyachok')
@Controller('piyachok')
export class PiyachokController {
    constructor(
        private readonly piyachokService: PiyachokService,
        private readonly piyachokRepliesService: PiyachokRepliesService,
    ) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Створити новий пиячок' })
    @ApiCreatedResponse({
        description: 'Пиячок успішно створено',
        type: PiyachokPresenter,
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
        description: 'Новину не знайдено',
        type: ResponseErrorDto,
    })
    @ApiConflictResponse({
        description: 'Користувач не може створити більше, ніж один пиячок',
        type: ResponseErrorDto,
    })
    async create(
        @Body() createPiyachokDto: CreatePiyachokDto,
        @Req() req: IUserRequest,
    ): Promise<Piyachok> {
        return this.piyachokService.create(createPiyachokDto, req.user.data.id);
    }

    @Get()
    @ApiOperation({ summary: 'Отримати список пиячків' })
    @ApiOkResponse({
        description: 'Список пиячків',
        type: PiyachokFindPresenter,
    })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseBadRequestErrorDto,
    })
    @SerializeOptions({
        type: PiyachokFindPresenter,
        excludeExtraneousValues: true,
    })
    async find(@Query() query: QueryBaseDto): Promise<PiyachokFindPresenter> {
        return this.piyachokService.find(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Отримати пиячок за ID' })
    @ApiParam({
        name: 'id',
        description: 'ID пиячка',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    })
    @ApiOkResponse({
        description: 'Деталі пиячка',
        type: PiyachokDetailPresenter,
    })
    @ApiNotFoundResponse({
        description: 'Пиячок не знайдено',
        type: ResponseErrorDto,
    })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseBadRequestErrorDto,
    })
    @SerializeOptions({
        type: PiyachokDetailPresenter,
        excludeExtraneousValues: true,
    })
    async findById(
        @Param('id', PiyachokIdValidationPipe, PiyachokBodyValidationPipe)
        id: string,
    ): Promise<Piyachok> {
        return this.piyachokService.findById(id);
    }

    @Get(':id/replies')
    @ApiOperation({ summary: 'Отримати відповіді пиячка' })
    @ApiParam({
        name: 'id',
        description: 'ID пиячка',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    })
    @ApiOkResponse({
        type: PiyachokRepliesFindPresenter,
        description: 'Список відповідей',
    })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseBadRequestErrorDto,
    })
    @SerializeOptions({
        type: PiyachokRepliesFindPresenter,
        excludeExtraneousValues: true,
    })
    async findReplies(
        @Param('id') id: string,
        @Query() query: QueryBaseDto,
    ): Promise<PiyachokRepliesFindPresenter> {
        return this.piyachokRepliesService.find(id, query);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'), CanManagePiyachokGuard)
    @ApiOperation({ summary: 'Оновити пиячок' })
    @ApiParam({
        name: 'id',
        description: 'ID пиячка',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    })
    @ApiNoContentResponse({ description: 'Пиячок оновлено' })
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
        description: 'Пиячок не знайдено',
        type: ResponseErrorDto,
    })
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(
        @Param('id') id: string,
        @Body() updatePiyachokDto: UpdatePiyachokDto,
    ): Promise<void> {
        return this.piyachokService.update(id, updatePiyachokDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), CanManagePiyachokGuard)
    @ApiOperation({ summary: 'Видалити пиячок' })
    @ApiParam({
        name: 'id',
        description: 'ID пиячка',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    })
    @ApiNoContentResponse({ description: 'Пиячок видалено' })
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
        description: 'Пиячок не знайдено',
        type: ResponseErrorDto,
    })
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id')
        id: string,
    ): Promise<void> {
        return this.piyachokService.delete(id);
    }
}
