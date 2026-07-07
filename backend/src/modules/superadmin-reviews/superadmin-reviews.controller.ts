import {
    Controller,
    Get,
    Query,
    SerializeOptions,
    UseGuards,
} from '@nestjs/common';
import { SuperadminReviewsService } from './superadmin-reviews.service';
import { AuthGuard } from '@nestjs/passport';
import { SuperadminReviewFindPresenter } from '../../shared/presenters/find.presenter';
import { Review } from '../reviews/entities/review.entity';
import { SuperadminReviewsQuery } from './dto/superadmin-reviews-query';
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

@ApiTags('Модерація відгуків (адміністратор)')
@UseGuards(AuthGuard('jwt'), IsSuperadminGuard)
@Controller()
export class SuperadminReviewsController {
    constructor(
        private readonly superadminReviewsService: SuperadminReviewsService,
    ) {}

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Пошук всіх відгуків',
        description:
            'Дозволяє адміністратору переглядати всі відгуки з підтримкою фільтрації та пошуку за різними критеріями.',
    })
    @ApiOkResponse({
        description: 'Успішно отримано список відгуків',
        type: SuperadminReviewFindPresenter,
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
    @UseGuards(AuthGuard('jwt'))
    @SerializeOptions({
        type: SuperadminReviewFindPresenter,
        excludeExtraneousValues: true,
    })
    async myReviews(
        @Query() query: SuperadminReviewsQuery,
    ): Promise<{ data: Review[]; total: number; totalPages: number }> {
        return await this.superadminReviewsService.find(query);
    }
}
