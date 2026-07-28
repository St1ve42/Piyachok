import {IFoodAndDrinkOneFromList} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOneFromList";

export interface IFoodAndDrinksByCategory {
    topCategory: string,
    foodAndDrinks: IFoodAndDrinkOneFromList[]
}