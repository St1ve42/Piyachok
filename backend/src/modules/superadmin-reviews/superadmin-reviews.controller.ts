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

@UseGuards(AuthGuard('jwt'), IsSuperadminGuard)
@Controller()
export class SuperadminReviewsController {
    constructor(
        private readonly superadminReviewsService: SuperadminReviewsService,
    ) {}

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
