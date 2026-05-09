import { UserPresenter } from '../../users/presenters/user.presenter';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProtectedUserFindOnePresenter extends UserPresenter {
    @ApiProperty({
        example: '2024-01-15T10:30:00Z',
        description: 'Дата створення акаунту користувача',
    })
    @Expose()
    createdAt: Date;

    @ApiProperty({
        example: '2024-05-01T14:45:30Z',
        description: 'Дата останнього оновлення даних користувача',
    })
    @Expose()
    updatedAt: Date;
}
