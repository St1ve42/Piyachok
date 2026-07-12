import {
    Controller,
    Get,
    Query,
    SerializeOptions,
    UseGuards,
} from '@nestjs/common';
import { CommentsService } from '../comments/comments.service';
import { SuperadminCommentFindPresenter } from '../../shared/presenters/find.presenter';
import { SuperadminQueryCommentDto } from '../comments/dto/superadmin-query-comment.dto';
import { Comment } from '../comments/entities/comment.entity';
import { AuthGuard } from '@nestjs/passport';
import { IsSuperadminGuard } from '../../shared/guards/is-superadmin.guard';
import {
    ApiTags,
    ApiCookieAuth,
    ApiOperation,
    ApiOkResponse,
    ApiUnauthorizedResponse,
    ApiForbiddenResponse,
    ApiBadRequestResponse,
} from '@nestjs/swagger';
import { ResponseErrorDto } from '../../shared/dto/response-error.dto';
import { ResponseBadRequestErrorDto } from '../../shared/dto/response-bad-request-error.dto';

@ApiTags('Модерація коментарів (адміністратор)')
@Controller()
@UseGuards(AuthGuard('jwt'), IsSuperadminGuard)
export class SuperadminCommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Пошук всіх коментарів',
        description:
            'Дозволяє адміністратору переглядати всі коментарі з підтримкою фільтрації та пошуку за різними критеріями.',
    })
    @ApiOkResponse({
        description: 'Успішно отримано список коментарів',
        type: SuperadminCommentFindPresenter,
    })
    @ApiBadRequestResponse({
        description: 'Помилка валідації даних',
        type: ResponseBadRequestErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Користувач не має прав адміністратора',
        type: ResponseErrorDto,
    })
    @Get()
    @SerializeOptions({
        type: SuperadminCommentFindPresenter,
        excludeExtraneousValues: true,
    })
    async find(
        @Query() query: SuperadminQueryCommentDto,
    ): Promise<{ data: Comment[]; total: number; totalPages: number }> {
        return this.commentsService.find(query);
    }
}
