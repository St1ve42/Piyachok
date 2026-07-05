import { ReviewPresenter } from './ReviewPresenter';
import { Expose, Transform, Type } from 'class-transformer';
import { Review } from '../entities/review.entity';
import { ShortUserInfoPresenter } from '../../users/presenters/short-user-info-presenter';

export class ReviewWithOwnerPresenter extends ReviewPresenter {
    @Expose()
    @Transform(({ obj }: { obj: Review }) => obj.user, { toClassOnly: true })
    @Type(() => ShortUserInfoPresenter)
    creator: ShortUserInfoPresenter;
}
