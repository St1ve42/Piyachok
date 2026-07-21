import {IFoodAndDrinkShortInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkShortInfo";
import {INews} from "@/src/interfaces/news/INews";

export interface IGeneralNews extends INews{
    foodAndDrink: IFoodAndDrinkShortInfo;
}