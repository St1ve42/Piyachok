import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewPresenter {
    @ApiProperty({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        description: 'Унікальний ідентифікатор відгуку (UUID)',
    })
    @Expose()
    id: string;

    @ApiProperty({
        example: 5,
        description: 'Рейтинг закладу (від 1 до 5)',
    })
    @Expose()
    rating: number;

    @ApiProperty({
        example:
            "Чудовий заклад з вишуканим інтер'єром та гарячою гостинністю. Їжа була смачна і свіжа.",
        description: 'Текст відгуку',
    })
    @Expose()
    text: string;

    @ApiProperty({
        example: 250,
        description: 'Середня вартість однієї позиції меню в гривнях',
    })
    @Expose()
    averageReceipt: number;

    @ApiProperty({
        example: '2024-12-07T10:30:00Z',
        description: 'Дата та час створення відгуку',
    })
    @Expose()
    createdAt: Date;
}
