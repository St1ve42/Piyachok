import { FoodAndDrinkFeaturesEnum } from '../enums/food-and-drink-features.enum';

export type FoodAndDrinkFeaturesTranslateType = {
    [K in FoodAndDrinkFeaturesEnum]: string;
};

export const FoodAndDrinkFeaturesTranslate: FoodAndDrinkFeaturesTranslateType =
    {
        [FoodAndDrinkFeaturesEnum.WI_FI]: 'WI-FI',
        [FoodAndDrinkFeaturesEnum.PARKING]: 'Парковка',
        [FoodAndDrinkFeaturesEnum.LIVE_MUSIC]: 'Жива музика',
        [FoodAndDrinkFeaturesEnum.IS_24_HOURS]: '24/7',
    };
