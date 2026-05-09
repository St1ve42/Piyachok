import { FoodAndDrinkTypeEnum } from '../enums/food-and-drink-type.enum';
import { Expose, Transform, Type } from 'class-transformer';
import { FeaturePresenter } from './feature-presenter';
import { ApiProperty } from '@nestjs/swagger';
import { LocationPresenter } from './location.presenter';

export class FoodAndDrinkFindOnePresenter {
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
        enum: ['restaurant', 'cafe', 'bar', 'fast-food'],
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
        example: 'uploads/restaurant-ukraine.jpg',
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
        example: '1.5 км',
        description: 'Відстань від користувача до закладу',
        nullable: true,
    })
    @Expose()
    @Transform(({ value }: { value: string | undefined }) =>
        value === undefined ? null : value,
    )
    distance: string | null;

    @ApiProperty({
        description: 'Особливості закладу (вай-фай, парковка, музика, 24/7)',
    })
    @Expose()
    @Type(() => FeaturePresenter)
    features: FeaturePresenter;
}
