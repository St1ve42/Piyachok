import { ReviewPresenter } from '../../reviews/presenter/ReviewPresenter';
import { ShortUserInfoPresenter } from '../../users/presenters/short-user-info-presenter';
import { ShortFoodAndDrinkInfoPresenter } from '../../food-and-drink/presenters/short-food-and-drink-info.presenter';
import { Expose, Transform, Type } from 'class-transformer';
import { Review } from '../../reviews/entities/review.entity';

export class SuperadminReviewsFindOnePresenter extends ReviewPresenter {
    @Expose()
    @Transform(({ obj }: { obj: Review }) => obj.user, { toClassOnly: true })
    @Type(() => ShortUserInfoPresenter)
    creator: ShortUserInfoPresenter;
    @Expose()
    @Type(() => ShortFoodAndDrinkInfoPresenter)
    foodAndDrink: ShortFoodAndDrinkInfoPresenter;
}
