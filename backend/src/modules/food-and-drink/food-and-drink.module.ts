import { forwardRef, Module } from '@nestjs/common';
import { FoodAndDrinkService } from './food-and-drink.service';
import { FoodAndDrinkController } from './food-and-drink.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodAndDrink } from './entities/food-and-drink.entity';
import { FoodAndDrinkStatistic } from '../food-and-drink-statistics/entities/food-and-drink-statistic.entity';
import { FoodAndDrinkViewsPerDay } from '../food-and-drinks-views/entity/food-and-drink-views-per-day.entity';
import { UserView } from '../food-and-drinks-views/entity/user-views.entity';
import { TagsModule } from '../tags/tags.module';
import { StorageModule } from '../storage/storage.module';
import { RolesModule } from '../roles/roles.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { FoodAndDrinkFavouritesModule } from '../food-and-drink-favourites/food-and-drink-favourites.module';
import { FoodAndDrinkStatisticsModule } from '../food-and-drink-statistics/food-and-drink-statistics.module';
import { FoodAndDrinkViewsModule } from '../food-and-drinks-views/food-and-drink-views.module';
import { Review } from '../reviews/entities/review.entity';
import { Comment } from '../comments/entities/comment.entity';
import { ReviewsModule } from '../reviews/reviews.module';
import { CommentsModule } from '../comments/comments.module';
import { TokensModule } from '../tokens/tokens.module';
import { EmailModule } from '../email/email.module';
import { News } from '../news/entities/news.entity';
import { FoodAndDrinkTopCategory } from '../food-and-drink-top-category/entities/food-and-drink-top-category.entity';
import { Piyachok } from '../piyachok/entities/piyachok.entity';
import { PiyachokReply } from '../piyachok-replies/entities/piyachok-reply.entity';
import { NewsModule } from '../news/news.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FoodAndDrink,
            FoodAndDrinkStatistic,
            FoodAndDrinkViewsPerDay,
            UserView,
            User,
            Review,
            Comment,
            News,
            FoodAndDrinkTopCategory,
            Piyachok,
            PiyachokReply,
        ]),
        NewsModule,
        forwardRef(() => UsersModule),
        forwardRef(() => TagsModule),
        StorageModule,
        RolesModule,
        FoodAndDrinkFavouritesModule,
        FoodAndDrinkStatisticsModule,
        FoodAndDrinkViewsModule,
        ReviewsModule,
        CommentsModule,
        TokensModule,
        EmailModule,
    ],
    controllers: [FoodAndDrinkController],
    providers: [FoodAndDrinkService],
    exports: [FoodAndDrinkService],
})
export class FoodAndDrinkModule {}
