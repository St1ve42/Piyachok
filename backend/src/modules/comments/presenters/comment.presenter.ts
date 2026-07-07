import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CommentPresenter {
    @ApiProperty({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        description: 'Унікальний ідентифікатор коментарю (UUID)',
    })
    @Expose()
    id: string;

    @ApiProperty({
        example: 'Це чудовий заклад, але трохи дорого',
        description: 'Текст коментарю',
    })
    @Expose()
    text: string;

    @ApiProperty({
        example: '2024-12-07T10:30:00Z',
        description: 'Дата та час створення коментарю',
    })
    @Expose()
    createdAt: string;

    @ApiProperty({
        example: '2024-12-07T14:45:00Z',
        description: 'Дата та час останнього оновлення коментарю',
    })
    @Expose()
    updatedAt: string;
}
