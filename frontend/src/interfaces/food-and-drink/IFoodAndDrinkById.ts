import {IFoodAndDrink} from "@/src/interfaces/food-and-drink/IFoodAndDrink";

export interface IFoodAndDrinkById extends IFoodAndDrink {
    isFavourite: boolean | null
    isOwner: boolean | null
}