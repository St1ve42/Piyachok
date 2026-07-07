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
import { CommentPresenter } from '../../modules/comments/presenters/comment.presenter';
import { CommentUserPresenter } from '../../modules/comments/presenters/comment-user.presenter';

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

export const CommentFindPresenter =
    createFindPresenter<CommentPresenter>(CommentPresenter);

export const UserCommentFindPresenter =
    createFindPresenter<CommentUserPresenter>(CommentUserPresenter);
