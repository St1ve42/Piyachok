import {
    Controller,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req,
    SerializeOptions,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import type { IUserRequest } from '../auth/interfaces/IUserRequest';
import { CommentPresenter } from './presenters/comment.presenter';
import { Comment } from './entities/comment.entity';
import { CommentPermissionGuard } from './guards/comment-permission.guard';
import {
    ApiTags,
    ApiCookieAuth,
    ApiOperation,
    ApiCreatedResponse,
    ApiBadRequestResponse,
    ApiUnauthorizedResponse,
    ApiNoContentResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiParam,
} from '@nestjs/swagger';
import { ResponseErrorDto } from '../../shared/dto/response-error.dto';
import { ResponseBadRequestErrorDto } from '../../shared/dto/response-bad-request-error.dto';

@ApiTags('Коментарі')
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Створення коментарю',
        description:
            'Дозволяє авторизованому користувачеві залишити коментар до закладу харчування.',
    })
    @ApiCreatedResponse({
        description: 'Коментар успішно створено',
        type: CommentPresenter,
    })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseBadRequestErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @Post()
    @UseGuards(AuthGuard('jwt'))
    @SerializeOptions({
        type: CommentPresenter,
        excludeExtraneousValues: true,
    })
    async create(
        @Body() createCommentDto: CreateCommentDto,
        @Req() req: IUserRequest,
    ): Promise<Comment> {
        const userId = req.user.data.id;
        return this.commentsService.create(createCommentDto, userId);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Оновлення коментарю',
        description: 'Дозволяє користувачеві оновити свій коментар до закладу.',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID ідентифікатор коментарю',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiNoContentResponse({
        description: 'Коментар успішно оновлено',
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
        description: 'Немає прав для редагування цього коментарю',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Коментар не знайдено',
        type: ResponseErrorDto,
    })
    @UseGuards(AuthGuard('jwt'), CommentPermissionGuard)
    @Patch(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(
        @Param('id') id: string,
        @Body() updateCommentDto: UpdateCommentDto,
    ): Promise<void> {
        await this.commentsService.updateById(id, updateCommentDto);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Видалення коментарю',
        description:
            'Дозволяє користувачеві видалити свій коментар до закладу.',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID ідентифікатор коментарю',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiNoContentResponse({
        description: 'Коментар успішно видалено',
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Немає прав для видалення цього коментарю',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Коментар не знайдено',
        type: ResponseErrorDto,
    })
    @UseGuards(AuthGuard('jwt'), CommentPermissionGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string): Promise<void> {
        await this.commentsService.remove(id);
    }
}
