import { FoodAndDrinkTypeEnum } from '../enums/food-and-drink-type.enum';
import { FoodAndDrink } from '../entities/food-and-drink.entity';
import { Expose, Type } from 'class-transformer';
import { FeaturePresenter } from './feature-presenter';

export class FoodAndDrinkListPresenter {
    @Expose()
    private id: string;
    @Expose()
    private name: string;
    @Expose()
    private type: FoodAndDrinkTypeEnum;
    @Expose()
    private location: string;
    @Expose()
    private businessHours: string;
    @Expose()
    private mainImage: string | null;
    @Expose()
    private rating: number | null;
    @Expose()
    @Type(() => FeaturePresenter)
    public features: FeaturePresenter;

    constructor(foodAndDrink: Partial<FoodAndDrink>) {
        Object.assign(this, {
            foodAndDrink,
        });
    }
}
