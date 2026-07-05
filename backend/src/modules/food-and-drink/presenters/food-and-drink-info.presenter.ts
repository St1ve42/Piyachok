import { FoodAndDrinkTypeEnum } from '../enums/food-and-drink-type.enum';
import { Expose, Transform, Type } from 'class-transformer';
import { TagsPresenter } from './tags-presenter';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LocationPresenter } from './location.presenter';
import { BusinessHoursPresenter } from './business-hours.presenter';
import { FoodAndDrinkFeaturesEnum } from '../enums/food-and-drink-features.enum';
import { FoodAndDrink } from '../entities/food-and-drink.entity';

export class FoodAndDrinkInfoPresenter {
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
        example:
            "Традиційна українська кухня у серці міста з вишуканим інтер'єром та гарячою гостинністю.",
        description: 'Детальний опис закладу',
    })
    @Expose()
    description: string;

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
        description: 'Місто розташування закладу',
        example: 'м. Львів',
    })
    @Expose()
    @Transform(({ obj }: { obj: FoodAndDrink }) => obj.city.name || null, {
        toClassOnly: true,
    })
    city: string;

    @Expose()
    @Transform(
        ({ obj }: { obj: FoodAndDrink }) => obj.city.region.name || null,
        {
            toClassOnly: true,
        },
    )
    region: string;

    @ApiProperty({
        type: 'array',
        example: [
            { day: 'понеділок', start: '08:00', end: '22:00' },
            { day: 'вівторок', start: '08:00', end: '22:00' },
        ],
        description: 'Розклад роботи закладу по дням тижня',
    })
    @Expose()
    businessHours: Array<BusinessHoursPresenter>;

    @ApiProperty({
        type: 'array',
        example: [
            'uploads/restaurant-1.jpg',
            'uploads/restaurant-2.jpg',
            'uploads/restaurant-3.jpg',
        ],
        description: 'Список URL зображень закладу',
        nullable: true,
    })
    @Expose()
    images: string[] | null;

    @ApiPropertyOptional({
        example: 'uploads/restaurant-main.jpg',
        description: 'URL основного (головного) зображення закладу',
    })
    @Expose()
    mainImage?: string | null;

    @ApiProperty({
        example: '+380501234567',
        description: 'Телефон закладу',
    })
    @Expose()
    phone: string;

    @ApiProperty({
        example: 250,
        description: 'Середня вартість однієї позиції меню в гривнях',
    })
    @Expose()
    averageReceipt: number;

    @ApiProperty({
        example: 'https://www.restaurant-ukraine.com.ua',
        description: 'Веб-сайт закладу',
        nullable: true,
    })
    @Expose()
    site: string | null;

    @ApiProperty({
        example: 8.5,
        description: 'Рейтинг закладу (від 0 до 10)',
        nullable: true,
    })
    @Expose()
    rating: number | null;

    @ApiPropertyOptional({
        example: {
            instagram: '@restaurant_ukraine',
            telegram: '@restaurant_ukraine_channel',
            facebook: 'restaurant.ukraine',
            X: '@restaurant_ukraine',
        },
        description: 'Посилання на соціальні мережі закладу',
    })
    @Expose()
    @Transform(
        ({
            value,
        }: {
            value: {
                instagram?: string;
                telegram?: string;
                facebook?: string;
                X?: string;
            };
        }) => (Object.keys(value).length === 0 ? null : value),
        { toPlainOnly: true },
    )
    socialNetworks?: {
        instagram?: string;
        telegram?: string;
        facebook?: string;
        X?: string;
    };

    @ApiProperty({
        example: Object.values(FoodAndDrinkFeaturesEnum),
        description: 'Особливості закладу (вай-фай, парковка, музика, 24/7)',
    })
    @Expose()
    features: FoodAndDrinkFeaturesEnum[];

    @ApiPropertyOptional({
        type: 'array',
        example: ['Українська кухня', 'Вегетаріанське меню', 'Винна карта'],
        description: 'Теги для категоризації закладу',
        nullable: true,
    })
    @Expose()
    @Type(() => TagsPresenter)
    @Transform(
        ({ value }: { value: TagsPresenter[] }) => {
            if (value.length === 0) {
                return null;
            }
            return value.map((tagPresenter) => tagPresenter.name);
        },
        { toPlainOnly: true },
    )
    tags: TagsPresenter[];

    @ApiPropertyOptional({
        example: true,
    })
    @Expose()
    isFavourite: boolean | null;

    @ApiPropertyOptional({
        example: true,
    })
    @Expose()
    isOwner: boolean | null;
}
