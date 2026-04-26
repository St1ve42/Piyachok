import { FoodAndDrink } from '../entities/food-and-drink.entity';
import { FoodAndDrinkSortEnum } from '../enums/food-and-drink-sort.enum';

type ISort<T, K extends keyof T> = Partial<Record<K, 'asc' | '-desc'>>;

export type FoodAndDrinkSort = ISort<FoodAndDrink, FoodAndDrinkSortEnum>;
