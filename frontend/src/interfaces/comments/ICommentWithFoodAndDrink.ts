import {IComment} from "@/src/interfaces/comments/IComment";
import {IFoodAndDrinkShortInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkShortInfo";

export interface ICommentWithFoodAndDrink extends IComment{
    foodAndDrink: IFoodAndDrinkShortInfo
}