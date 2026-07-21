import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './shared/services/env.service';
import { TypeormModule } from './typeorm/typeorm.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { RegionsModule } from './modules/regions/regions.module';
import { CitiesModule } from './modules/cities/cities.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokensModule } from './modules/tokens/tokens.module';
import { EmailModule } from './modules/email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { FoodAndDrinkModule } from './modules/food-and-drink/food-and-drink.module';
import { FoodAndDrinkStatisticsModule } from './modules/food-and-drink-statistics/food-and-drink-statistics.module';
import { TagsModule } from './modules/tags/tags.module';
import { SuperadminUsersModule } from './modules/superadmin-users/superadmin-users.module';
import { RouterModule } from '@nestjs/core';
import { SuperadminFoodAndDrinkModule } from './modules/superadmin-food-and-drink/superadmin-food-and-drink.module';
import { StorageModule } from './modules/storage/storage.module';
import { UtilsModule } from './modules/utils/utils.module';
import { FoodAndDrinkFavouritesModule } from './modules/food-and-drink-favourites/food-and-drink-favourites.module';
import { FoodAndDrinkViewsModule } from './modules/food-and-drinks-views/food-and-drink-views.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { CommentsModule } from './modules/comments/comments.module';
import { SuperadminReviewsModule } from './modules/superadmin-reviews/superadmin-reviews.module';
import { SuperadminCommentsModule } from './modules/superadmin-comments/superadmin-comments.module';
import { NewsModule } from './modules/news/news.module';
import { FoodAndDrinkCategoryModule } from './modules/food-and-drink-top-category/food-and-drink-category.module';
import { PiyachokModule } from './modules/piyachok/piyachok.module';
import { PiyachokRepliesModule } from './modules/piyachok-replies/piyachok-replies.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MailerModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (envService: EnvService) => ({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                        user: envService.smtpUser,
                        pass: envService.smtpPassword,
                    },
                },
                defaults: {
                    from: '"Пиячок" <noreply@example.com>',
                },
                template: {
                    dir: path.join(
                        __dirname,
                        'modules',
                        'email',
                        'templates',
                        'views',
                    ),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
                options: {
                    partials: {
                        dir: path.join(
                            __dirname,
                            'modules',
                            'email',
                            'templates',
                            'partials',
                        ),
                        options: {
                            strict: true,
                        },
                    },
                },
            }),
            inject: [EnvService],
        }),
        TypeormModule,
        SharedModule,
        UsersModule,
        RegionsModule,
        CitiesModule,
        RolesModule,
        AuthModule,
        TokensModule,
        EmailModule,
        FirebaseModule,
        FoodAndDrinkModule,
        FoodAndDrinkStatisticsModule,
        TagsModule,
        SuperadminUsersModule,
        RouterModule.register([
            {
                path: 'superadmin',
                children: [
                    {
                        path: '/users',
                        module: SuperadminUsersModule,
                    },
                    {
                        path: '/food-and-drinks',
                        module: SuperadminFoodAndDrinkModule,
                    },
                    {
                        path: '/roles',
                        module: RolesModule,
                    },
                    {
                        path: '/reviews',
                        module: SuperadminReviewsModule,
                    },
                    {
                        path: '/comments',
                        module: SuperadminCommentsModule,
                    },
                    {
                        path: '/top-categories',
                        module: FoodAndDrinkCategoryModule,
                    },
                ],
            },
        ]),
        SuperadminFoodAndDrinkModule,
        StorageModule,
        UtilsModule,
        FoodAndDrinkFavouritesModule,
        FoodAndDrinkViewsModule,
        ReviewsModule,
        CommentsModule,
        SuperadminReviewsModule,
        SuperadminCommentsModule,
        NewsModule,
        FoodAndDrinkCategoryModule,
        PiyachokModule,
        PiyachokRepliesModule,
    ],
    controllers: [],
    providers: [
        EnvService,
        {
            provide: 'APP_FILTER',
            useClass: GlobalExceptionFilter,
        },
    ],
})
export class AppModule {}
