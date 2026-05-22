import {IFoodAndDrink} from "@/src/interfaces/food-and-drink/IFoodAndDrink";

export interface IFoodAndDrinkOwnerInfo extends IFoodAndDrink{
    status: 'active' | 'pending' | 'inactive';
    createdAt: string;
    updatedAt: string;
}