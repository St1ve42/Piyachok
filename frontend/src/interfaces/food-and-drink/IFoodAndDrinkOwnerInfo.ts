import {IFoodAndDrink} from "@/src/interfaces/food-and-drink/IFoodAndDrink";
import {FoodAndDrinkStatusEnum} from "@/src/enums/food-and-drink/food-and-drink-status.enum";

export interface IFoodAndDrinkOwnerInfo extends IFoodAndDrink{
    email: string,
    isEmailVerified: boolean,
    status: FoodAndDrinkStatusEnum;
    createdAt: string;
    updatedAt: string;
}