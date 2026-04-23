import { Expose } from 'class-transformer';
import { FoodAndDrink } from '../entities/food-and-drink.entity';
import { FoodAndDrinkStatusEnum } from '../enums/food-and-drink-status.enum';
import { FoodAndDrinkInfoPresenter } from './food-and-drink-info.presenter';

export class FoodAndDrinkOwnerInfoPresenter extends FoodAndDrinkInfoPresenter {
    @Expose()
    status: FoodAndDrinkStatusEnum;
    @Expose()
    createdAt: Date;
    @Expose()
    updatedAt: Date;
    constructor(foodAndDrink: Partial<FoodAndDrink>) {
        super(foodAndDrink);
        Object.assign(this, {
            foodAndDrink,
        });
    }
}

// export class FoodAndDrinkOwnerInfoPresenter {
//     @Expose()
//     id: string;
//     @Expose()
//     name: string;
//     @Expose()
//     description: string;
//     @Expose()
//     type: FoodAndDrinkTypeEnum;
//     @Expose()
//     location: string;
//     @Expose()
//     businessHours: string;
//     @Expose()
//     images: string[] | null;
//     @Expose()
//     mainImage?: string | null;
//     @Expose()
//     phone: string;
//     @Expose()
//     averageReceipt: number;
//     @Expose()
//     site: string | null;
//     @Expose()
//     rating: number | null;
//     @Expose()
//     socialNetworks?: {
//         instagram?: string;
//         telegram?: string;
//         facebook?: string;
//         X?: string;
//     };
//     @Type(() => Features)
//     @Expose()
//     features: Features | null;
//     @Expose()
//     @Type(() => Tag)
//     tags: Tag[] | null;
//     @Expose()
//     status: FoodAndDrinkStatusEnum;
//     @Expose()
//     createdAt: Date;
//     @Expose()
//     updatedAt: Date;
//     constructor(foodAndDrink: Partial<FoodAndDrink>) {
//         Object.assign(this, {
//             foodAndDrink,
//         });
//     }
// }
