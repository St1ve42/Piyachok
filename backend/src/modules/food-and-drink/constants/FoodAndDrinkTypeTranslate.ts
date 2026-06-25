import { FoodAndDrinkTypeEnum } from '../enums/food-and-drink-type.enum';

export type FoodAndDrinkTypeTranslateType = {
    [K in FoodAndDrinkTypeEnum]: string;
};

export const FoodAndDrinkTypeTranslate: FoodAndDrinkTypeTranslateType = {
    [FoodAndDrinkTypeEnum.RESTAURANT]: 'ресторан',
    [FoodAndDrinkTypeEnum.CAFE]: 'кафе',
    [FoodAndDrinkTypeEnum.BAR]: 'бар',
    [FoodAndDrinkTypeEnum.PUB]: 'паб',
    [FoodAndDrinkTypeEnum.PIZZERIA]: 'піцерія',
    [FoodAndDrinkTypeEnum.FAST_FOOD]: 'фаст-фуд',
    [FoodAndDrinkTypeEnum.BAKERY]: 'пекарня',
    [FoodAndDrinkTypeEnum.COFFEE_SHOP]: 'кав`ярня',
    [FoodAndDrinkTypeEnum.BISTRO]: 'бістро',
    [FoodAndDrinkTypeEnum.SUSHI_BAR]: 'суші-бар',
    [FoodAndDrinkTypeEnum.CANTEEN]: 'їдальня',
    [FoodAndDrinkTypeEnum.HOOKAH_BAR]: 'кальянна',
};
