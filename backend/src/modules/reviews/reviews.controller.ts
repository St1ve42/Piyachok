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

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

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

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard('jwt'), ReviewPermissionGuard)
    async remove(
        @Param('id')
        id: string,
    ): Promise<void> {
        await this.reviewsService.delete(id);
    }

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
