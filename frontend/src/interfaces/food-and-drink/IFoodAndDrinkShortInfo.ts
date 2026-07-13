import {FoodAndDrinkStatusEnum} from "@/src/enums/food-and-drink/food-and-drink-status.enum";

export interface IFoodAndDrinkShortInfo {
    id: string;
    name: string;
    status: FoodAndDrinkStatusEnum
}