import { FoodAndDrink } from '../entities/food-and-drink.entity';
import { FoodAndDrinkSearchEnum } from '../enums/food-and-drink-search.enum';

type ISearch<T, K extends keyof T> = {
    [P in K]?: T[P];
};

export type FoodAndDrinkSearch = ISearch<FoodAndDrink, FoodAndDrinkSearchEnum> &
    Partial<
        Record<'isWifi' | 'isParking' | 'isLiveMusic' | 'IS_24_HOURS', boolean>
    >;
