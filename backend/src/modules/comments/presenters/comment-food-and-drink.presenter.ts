import { CommentPresenter } from './comment.presenter';
import { ShortUserInfoPresenter } from '../../users/presenters/short-user-info-presenter';
import { Expose, Type } from 'class-transformer';

export class CommentFoodAndDrinkPresenter extends CommentPresenter {
    @Expose()
    @Type(() => ShortUserInfoPresenter)
    user: ShortUserInfoPresenter;
}
