import {IComment} from "@/src/interfaces/comments/IComment";
import {IUserShortInfo} from "@/src/interfaces/users/IUserShortInfo";
import {IFoodAndDrinkShortInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkShortInfo";

export interface ICommentWithUserAndFoodAndDrink extends IComment{
    user: IUserShortInfo,
    foodAndDrink: IFoodAndDrinkShortInfo
}