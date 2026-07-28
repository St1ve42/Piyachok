import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PiyachokListPresenter } from './piyachok-list.presenter';
import { ShortUserInfoPresenter } from '../../users/presenters/short-user-info-presenter';

export class PiyachokDetailPresenter extends PiyachokListPresenter {
    @ApiProperty({ example: 'male' })
    @Expose()
    targetGender: string;

    @ApiProperty({ example: 4 })
    @Expose()
    peopleCount: number;

    @ApiProperty({ example: 'split' })
    @Expose()
    paymentType: string;

    @ApiProperty({ example: 500 })
    @Expose()
    budget: number;

    @ApiProperty({ example: '2024-12-20T10:00:00Z' })
    @Expose()
    createdAt: Date;

    @ApiProperty({ example: '2024-12-20T10:00:00Z' })
    @Expose()
    updatedAt: Date;

    @ApiProperty({ type: () => ShortUserInfoPresenter })
    @Expose()
    @Type(() => ShortUserInfoPresenter)
    creator: ShortUserInfoPresenter;
}
