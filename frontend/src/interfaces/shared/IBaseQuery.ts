import {IFoodAndDrinkSort} from "@/src/interfaces/food-and-drink/IFoodAndDrinkSort";
import {IFoodAndDrinkRange} from "@/src/interfaces/food-and-drink/IFoodAndDrinkRange";

export interface IBaseQuery{
    page?: number,
    limit?: number,
    skip?: number,
}

export interface IRegionCityQuery extends IBaseQuery{
    search?: string
}

export interface IFoodAndDrinkQuery extends IBaseQuery{
    [key: string]: unknown
    sort?: IFoodAndDrinkSort
    range?: IFoodAndDrinkRange
}

