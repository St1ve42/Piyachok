import { Module } from '@nestjs/common';
import { SuperadminReviewsService } from './superadmin-reviews.service';
import { SuperadminReviewsController } from './superadmin-reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../reviews/entities/review.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Review])],
    controllers: [SuperadminReviewsController],
    providers: [SuperadminReviewsService],
})
export class SuperadminReviewsModule {}
