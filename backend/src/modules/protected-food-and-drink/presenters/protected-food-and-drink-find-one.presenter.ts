import { Expose, Type } from 'class-transformer';
import { FoodAndDrinkTypeEnum } from '../../food-and-drink/enums/food-and-drink-type.enum';
import { FeaturePresenter } from '../../food-and-drink/presenters/feature-presenter';
import { FoodAndDrinkStatusEnum } from '../../food-and-drink/enums/food-and-drink-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { LocationPresenter } from '../../food-and-drink/presenters/location.presenter';

export class ProtectedFoodAndDrinkFindOnePresenter {
    @ApiProperty({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        description: 'Унікальний ідентифікатор закладу (UUID)',
    })
    @Expose()
    id: string;

    @ApiProperty({
        example: 'Ресторан Україна',
        description: 'Назва закладу',
    })
    @Expose()
    name: string;

    @ApiProperty({
        example: 'restaurant',
        enum: ['ресторан', 'кафе', 'бар', 'фаст-фуд'],
        description: 'Тип закладу',
    })
    @Expose()
    type: FoodAndDrinkTypeEnum;

    @ApiProperty({
        description: 'Адреса розташування закладу',
    })
    @Expose()
    location: LocationPresenter;

    @ApiProperty({
        type: 'array',
        example: [
            { day: 'понеділок', start: '08:00', end: '22:00' },
            { day: 'вівторок', start: '08:00', end: '22:00' },
        ],
        description: 'Розклад роботи закладу по дням тижня',
    })
    @Expose()
    businessHours: string;

    @ApiProperty({
        example: 'uploads/restaurant-main.jpg',
        description: 'URL основного зображення закладу',
        nullable: true,
    })
    @Expose()
    mainImage: string | null;

    @ApiProperty({
        example: 8.5,
        description: 'Рейтинг закладу (від 0 до 10)',
        nullable: true,
    })
    @Expose()
    rating: number | null;

    @ApiProperty({
        description: 'Особливості закладу (вай-фай, парковка, музика, 24/7)',
    })
    @Expose()
    @Type(() => FeaturePresenter)
    features: FeaturePresenter;

    @ApiProperty({
        example: 'active',
        enum: ['active', 'pending', 'inactive'],
        description: 'Статус закладу (активний або неактивний)',
    })
    @Expose()
    status: FoodAndDrinkStatusEnum;

    @ApiProperty({
        example: '2024-01-15T10:30:00Z',
        description: 'Дата створення запису про закладу',
    })
    @Expose()
    createdAt: Date;

    @ApiProperty({
        example: '2024-05-01T14:45:30Z',
        description: 'Дата останнього оновлення запису про закладу',
    })
    @Expose()
    updatedAt: Date;
}
