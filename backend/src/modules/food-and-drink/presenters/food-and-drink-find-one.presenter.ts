import { FoodAndDrinkTypeEnum } from '../enums/food-and-drink-type.enum';
import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { LocationPresenter } from './location.presenter';
import { CityPresenter } from '../../cities/presenters/city.presenter';
import { City } from '../../cities/entities/city.entity';
import { FoodAndDrinkFeaturesEnum } from '../enums/food-and-drink-features.enum';
import { FoodAndDrinkTopCategory } from '../../food-and-drink-top-category/entities/food-and-drink-top-category.entity';
import { FoodAndDrinkTopCategoryPresenter } from '../../food-and-drink-top-category/presenters/FoodAndDrinkTopCategoryPresenter';

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
        description: 'Місто розташування закладу',
        example: 'м. Львів',
    })
    @Expose()
    @Transform(({ value }: { value: City }) => value.name, {
        toPlainOnly: true,
    })
    @Type(() => CityPresenter)
    city: CityPresenter;

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
        example: 200,
        description: 'Середній чек закладу',
        nullable: true,
    })
    @Expose()
    averageReceipt: number;

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
        example: Object.values(FoodAndDrinkFeaturesEnum),
        description: 'Особливості закладу (вай-фай, парковка, музика, 24/7)',
    })
    @Expose()
    features: FoodAndDrinkFeaturesEnum[];

    @ApiProperty({
        example: ['День народження', 'Корпоратив'],
        description: 'Топ категорії, до яких належить заклад',
    })
    @Expose()
    @Transform(
        ({ value }: { value?: FoodAndDrinkTopCategory[] }) => {
            if (value) {
                return value.length > 0
                    ? value.map((value) => value.name)
                    : null;
            }
        },
        { toClassOnly: true },
    )
    @Type(() => FoodAndDrinkTopCategoryPresenter)
    topCategories: FoodAndDrinkTopCategoryPresenter[];
}
