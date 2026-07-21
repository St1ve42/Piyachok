import { NewsCategoryEnum } from '../enums/news-category.enum';
import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FoodAndDrinkNewsPresenter {
    @ApiProperty({
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        description: 'ID новини',
    })
    @Expose()
    id: string;

    @ApiProperty({
        example: 'Нова промо-акція у ресторані',
        description: 'Заголовок новини',
    })
    @Expose()
    title: string;

    @ApiPropertyOptional({
        example: 'https://site.com/photo.jpg',
        description: 'Посилання на фото (може бути null)',
        required: false,
    })
    @Expose()
    photo: string | null;

    @ApiProperty({
        example: 'general',
        enum: NewsCategoryEnum,
        description: 'Категорія новини',
    })
    @Expose()
    category: NewsCategoryEnum;

    @ApiProperty({ example: false, description: 'Показник промо-новини' })
    @Expose()
    isPromoted: boolean;

    @ApiProperty({
        example: '2026-01-01T12:00:00Z',
        description: 'Дата створення новини',
    })
    @Expose()
    createdAt: string;
}
