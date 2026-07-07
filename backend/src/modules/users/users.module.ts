import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { CitiesModule } from '../cities/cities.module';
import { RegionsModule } from '../regions/regions.module';
import { FoodAndDrinkModule } from '../food-and-drink/food-and-drink.module';
import { StorageModule } from '../storage/storage.module';
import { TokensModule } from '../tokens/tokens.module';
import { RolesModule } from '../roles/roles.module';
import { FoodAndDrinkFavouritesModule } from '../food-and-drink-favourites/food-and-drink-favourites.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { CommentsModule } from '../comments/comments.module';

@Module({
    imports: [
        StorageModule,
        TypeOrmModule.forFeature([User, Role]),
        CitiesModule,
        RegionsModule,
        forwardRef(() => FoodAndDrinkModule),
        TokensModule,
        RolesModule,
        FoodAndDrinkFavouritesModule,
        ReviewsModule,
        CommentsModule,
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
