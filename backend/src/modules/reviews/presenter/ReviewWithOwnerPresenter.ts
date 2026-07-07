import { ReviewPresenter } from './ReviewPresenter';
import { Expose, Transform, Type } from 'class-transformer';
import { Review } from '../entities/review.entity';
import { ShortUserInfoPresenter } from '../../users/presenters/short-user-info-presenter';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewWithOwnerPresenter extends ReviewPresenter {
    @ApiProperty({
        description: 'Інформація про користувача, який написав відгук',
    })
    @Expose()
    @Transform(({ obj }: { obj: Review }) => obj.user, { toClassOnly: true })
    @Type(() => ShortUserInfoPresenter)
    creator: ShortUserInfoPresenter;
}
