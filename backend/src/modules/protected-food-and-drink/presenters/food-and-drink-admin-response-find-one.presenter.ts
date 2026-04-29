import { Expose, Type } from 'class-transformer';
import { FoodAndDrinkTypeEnum } from '../../food-and-drink/enums/food-and-drink-type.enum';
import { FeaturePresenter } from '../../food-and-drink/presenters/feature-presenter';
import { FoodAndDrinkStatusEnum } from '../../food-and-drink/enums/food-and-drink-status.enum';

export class FoodAndDrinkAdminResponseFindOnePresenter {
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
    @Expose()
    private status: FoodAndDrinkStatusEnum;
    @Expose()
    private createdAt: Date;
    @Expose()
    private updatedAt: Date;

    constructor(
        foodAndDrink: Partial<FoodAndDrinkAdminResponseFindOnePresenter>,
    ) {
        Object.assign(this, foodAndDrink);
    }
}
