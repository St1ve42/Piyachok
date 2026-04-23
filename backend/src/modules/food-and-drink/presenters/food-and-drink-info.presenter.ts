import { FoodAndDrinkTypeEnum } from '../enums/food-and-drink-type.enum';
import { FoodAndDrink } from '../entities/food-and-drink.entity';
import { Expose, Transform, Type } from 'class-transformer';
import { TagsPresenter } from './tags-presenter';
import { FeaturePresenter } from './feature-presenter';

export class FoodAndDrinkInfoPresenter {
    @Expose()
    id: string;
    @Expose()
    name: string;
    @Expose()
    description: string;
    @Expose()
    type: FoodAndDrinkTypeEnum;
    @Expose()
    location: string;
    @Expose()
    businessHours: string;
    @Expose()
    images: string[] | null;
    @Expose()
    mainImage?: string | null;
    @Expose()
    phone: string;
    @Expose()
    averageReceipt: number;
    @Expose()
    site: string | null;
    @Expose()
    rating: number | null;
    @Expose()
    socialNetworks?: {
        instagram?: string;
        telegram?: string;
        facebook?: string;
        X?: string;
    };
    @Type(() => FeaturePresenter)
    @Expose()
    features: FeaturePresenter;
    @Expose()
    @Type(() => TagsPresenter)
    @Transform(
        ({ value }) =>
            (value as TagsPresenter[]).map((tagPresenter) => tagPresenter.name),
        { toPlainOnly: true },
    )
    tags: TagsPresenter[];

    constructor(foodAndDrink: Partial<FoodAndDrink>) {
        Object.assign(this, {
            foodAndDrink,
        });
    }
}
