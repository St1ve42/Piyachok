import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { FoodAndDrink } from '../food-and-drink/entities/food-and-drink.entity';
import { User } from '../users/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Review, FoodAndDrink, User])],
    controllers: [ReviewsController],
    providers: [ReviewsService],
    exports: [ReviewsService],
})
export class ReviewsModule {}
