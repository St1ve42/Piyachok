import { Expose, Type } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { BaseQueryPresenter } from './base-query.presenter';
import { FoodAndDrinkFindOnePresenter } from '../../modules/food-and-drink/presenters/food-and-drink-find-one.presenter';
import { SuperadminFoodAndDrinkFindOnePresenter } from '../../modules/superadmin-food-and-drink/presenters/superadmin-food-and-drink-find-one.presenter';
import { SuperadminUserFindOnePresenter } from '../../modules/superadmin-users/dto/superadmin-user-find-one.presenter';
import { ApiProperty } from '@nestjs/swagger';
import { SuperadminReviewsFindOnePresenter } from '../../modules/superadmin-reviews/dto/superadmin-reviews-find-one-presenter';
import { ReviewStatisticsPresenter } from '../../modules/reviews/presenter/ReviewStatisticsPresenter';
import { ReviewWithOwnerPresenter } from '../../modules/reviews/presenter/ReviewWithOwnerPresenter';
import { ReviewWithFoodAndDrinkPresenter } from '../../modules/reviews/presenter/ReviewWithFoodAndDrinkPresenter';
import { CommentSuperadminPresenter } from '../../modules/comments/presenters/comment-superadmin.presenter';
import { CommentUserPresenter } from '../../modules/comments/presenters/comment-user.presenter';
import { CommentFoodAndDrinkPresenter } from '../../modules/comments/presenters/comment-food-and-drink.presenter';
import { FoodAndDrinkNewsPresenter } from '../../modules/news/presenter/FoodAndDrinkNewsPresenter';
import { GeneralNewsPresenter } from '../../modules/news/presenter/GeneralNewsPresenter';
import { TopCategoryWithFoodAndDrinkPresenter } from '../../modules/food-and-drink-top-category/presenters/TopCategoryWithFoodAndDrinkPresenter';
import { PiyachokListPresenter } from '../../modules/piyachok/presenters';
import { FoodAndDrinkTopCategoryPresenter } from '../../modules/food-and-drink-top-category/presenters/FoodAndDrinkTopCategoryPresenter';
import { PiyachokReplyListPresenter } from '../../modules/piyachok-replies/presenters/piyachok-reply-list.presenter';

function createFindPresenter<T>(DataCls: ClassConstructor<T>) {
    class FindPresenter extends BaseQueryPresenter {
        @ApiProperty({ example: 10 })
        @Expose()
        total: number;

        @ApiProperty({ example: 10 })
        @Expose()
        totalPages: number;

        @ApiProperty({
            type: () => [DataCls],
        })
        @Expose()
        @Type(() => DataCls)
        data: T[];
    }
    Object.defineProperty(FindPresenter, 'name', {
        value: `${DataCls.name}FindPresenter`,
        writable: false,
    });
    return FindPresenter;
}

export const FoodAndDrinkResponseFindPresenter =
    createFindPresenter<FoodAndDrinkFindOnePresenter>(
        FoodAndDrinkFindOnePresenter,
    );

export const ProtectedFoodAndDrinkFindPresenter =
    createFindPresenter<SuperadminFoodAndDrinkFindOnePresenter>(
        SuperadminFoodAndDrinkFindOnePresenter,
    );

export const ProtectedUserFindPresenter =
    createFindPresenter<SuperadminUserFindOnePresenter>(
        SuperadminUserFindOnePresenter,
    );

export const ReviewWithOwnerFindPresenter =
    createFindPresenter<ReviewWithOwnerPresenter>(ReviewWithOwnerPresenter);

export const ReviewWithFoodAndDrinkFindPresenter =
    createFindPresenter<ReviewWithFoodAndDrinkPresenter>(
        ReviewWithFoodAndDrinkPresenter,
    );

export const SuperadminReviewFindPresenter =
    createFindPresenter<SuperadminReviewsFindOnePresenter>(
        SuperadminReviewsFindOnePresenter,
    );

export const ReviewStatisticsFindPresenter =
    createFindPresenter<ReviewStatisticsPresenter>(ReviewStatisticsPresenter);

export const SuperadminCommentFindPresenter =
    createFindPresenter<CommentSuperadminPresenter>(CommentSuperadminPresenter);

export const CommentFoodAndDrinkFindPresenter =
    createFindPresenter<CommentFoodAndDrinkPresenter>(
        CommentFoodAndDrinkPresenter,
    );

export const UserCommentFindPresenter =
    createFindPresenter<CommentUserPresenter>(CommentUserPresenter);

export const FoodAndDrinkNewsFindPresenter =
    createFindPresenter<FoodAndDrinkNewsPresenter>(FoodAndDrinkNewsPresenter);

export const GeneralNewsFindPresenter =
    createFindPresenter<GeneralNewsPresenter>(GeneralNewsPresenter);

export class FoodAndDrinkTopCategoriesFindPresenter extends createFindPresenter<FoodAndDrinkTopCategoryPresenter>(
    FoodAndDrinkTopCategoryPresenter,
) {}

export class FoodAndDrinkByCategoryFindPresenter extends createFindPresenter<TopCategoryWithFoodAndDrinkPresenter>(
    TopCategoryWithFoodAndDrinkPresenter,
) {}

export class PiyachokFindPresenter extends createFindPresenter<PiyachokListPresenter>(
    PiyachokListPresenter,
) {}

export class PiyachokRepliesFindPresenter extends createFindPresenter<PiyachokReplyListPresenter>(
    PiyachokReplyListPresenter,
) {}
