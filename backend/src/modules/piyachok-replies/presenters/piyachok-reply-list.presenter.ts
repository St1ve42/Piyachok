import { ApiProperty } from '@nestjs/swagger';
import { ShortUserInfoPresenter } from '../../users/presenters/short-user-info-presenter';
import { Expose, Type } from 'class-transformer';
import { PiyachokReplyPresenter } from './piyachok-reply.presenter';

export class PiyachokReplyListPresenter extends PiyachokReplyPresenter {
    @ApiProperty({ type: () => ShortUserInfoPresenter })
    @Expose()
    @Type(() => ShortUserInfoPresenter)
    responder: ShortUserInfoPresenter;
}
