import {
    Controller,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Req,
    HttpCode,
    HttpStatus,
    SerializeOptions,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthGuard } from '@nestjs/passport';
import type { IUserRequest } from '../auth/interfaces/IUserRequest';
import { ReviewPermissionGuard } from './guards/review.permission.guard';
import { ReviewPresenter } from './presenter/ReviewPresenter';
import { ReviewIdValidationPipe } from '../../shared/pipes/id-validation.pipe';
import { ReviewBodyValidationPipe } from '../../shared/pipes/body-validation.pipe';
import { ReviewComplaintDto } from './dto/review-complaint.dto';
import { Review } from './entities/review.entity';
import {
    ApiTags,
    ApiCookieAuth,
    ApiOperation,
    ApiCreatedResponse,
    ApiUnauthorizedResponse,
    ApiBadRequestResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiForbiddenResponse,
    ApiParam,
} from '@nestjs/swagger';
import { ResponseErrorDto } from '../../shared/dto/response-error.dto';
import { ResponseBadRequestErrorDto } from '../../shared/dto/response-bad-request-error.dto';

@ApiTags('Відгуки')
@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Створення відгуку',
        description:
            "Дозволяє авторизованому користувачеві створити новий відгук про заклад харчування. Відгук буде прив'язаний до користувача і закладу.",
    })
    @ApiCreatedResponse({
        description: 'Відгук успішно створено',
        type: ReviewPresenter,
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
        type: ReviewPresenter,
        excludeExtraneousValues: true,
    })
    async create(
        @Body() createReviewDto: CreateReviewDto,
        @Req() req: IUserRequest,
    ): Promise<Review> {
        return this.reviewsService.create(createReviewDto, req.user.data.id);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Видалення відгуку',
        description:
            'Дозволяє авторизованому користувачеві видалити свій відгук про заклад.',
    })
    @ApiNoContentResponse({
        description: 'Відгук успішно видалено',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID ідентифікатор відгуку',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Заборонено видалювати цей відгук',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Відгук не знайдено',
        type: ResponseErrorDto,
    })
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard('jwt'), ReviewPermissionGuard)
    async remove(
        @Param('id')
        id: string,
    ): Promise<void> {
        await this.reviewsService.delete(id);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Подання скарги на відгук',
        description:
            'Дозволяє авторизованому користувачеві подати скаргу на відгук іншого користувача.',
    })
    @ApiNoContentResponse({
        description: 'Скарга успішно подана',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID ідентифікатор відгуку',
        example: '550e8400-e29b-41d4-a716-446655440000',
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
        description: 'Відгук не знайдено',
        type: ResponseErrorDto,
    })
    @Post(':id/complaint')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard('jwt'))
    async sendComplaint(
        @Body() reviewComplaintDto: ReviewComplaintDto,
        @Param('id', ReviewIdValidationPipe, ReviewBodyValidationPipe)
        id: string,
        @Req() req: IUserRequest,
    ): Promise<void> {
        await this.reviewsService.sendComplaint(
            reviewComplaintDto,
            id,
            req.user.data,
        );
    }
}
