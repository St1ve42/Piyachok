import Joi from 'joi';
import { FoodAndDrinkTypeEnum } from "@/src/enums/food-and-drink/food-and-drink-type.enum";
import {FoodAndDrinkFeaturesEnum} from "@/src/enums/food-and-drink/food-and-drink-features.enum";
import {FoodAndDrinkSortByEnum} from "@/src/enums/food-and-drink/food-and-drink-sort-by.enum";

export const queryFoodAndDrinkValidator = Joi.object({
    page: Joi.number().min(1).default(1),
    name: Joi.string(),
    limit: Joi.number().min(1).max(20),
    tag: Joi.string(),
    type: Joi.string().valid(...Object.values(FoodAndDrinkTypeEnum)),
    rating: Joi.number().min(0).max(10),
    sort: Joi.string().valid('asc', 'desc'),
    sortBy: Joi.string().valid(...Object.values(FoodAndDrinkSortByEnum)),
    lat: Joi.string(),
    lng: Joi.string(),
    "features[]": Joi.alternatives().try(Joi.string().valid(...Object.values(FoodAndDrinkFeaturesEnum)), Joi.array<string[]>().items(Joi.string().valid(...Object.values(FoodAndDrinkFeaturesEnum)))),
    "averageReceipt[gte]": Joi.number().min(0),
    "averageReceipt[lte]": Joi.number().min(0)
})
