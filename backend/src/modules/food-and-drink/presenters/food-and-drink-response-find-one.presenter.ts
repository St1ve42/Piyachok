import { FoodAndDrinkTypeEnum } from '../enums/food-and-drink-type.enum';
import { Expose, Transform, Type } from 'class-transformer';
import { FeaturePresenter } from './feature-presenter';

export class FoodAndDrinkResponseFindOnePresenter {
    @Expose()
    id: string;
    @Expose()
    name: string;
    @Expose()
    type: FoodAndDrinkTypeEnum;
    @Expose()
    location: string;
    @Expose()
    businessHours: string;
    @Expose()
    mainImage: string | null;
    @Expose()
    rating: number | null;
    @Expose()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    @Transform(({ value }) => (value === undefined ? null : value))
    distance: string | null;
    @Expose()
    @Type(() => FeaturePresenter)
    features: FeaturePresenter;
}
