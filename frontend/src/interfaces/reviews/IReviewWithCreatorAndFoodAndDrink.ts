import {IReview} from "@/src/interfaces/reviews/IReview";
import {IUserShortInfo} from "@/src/interfaces/users/IUserShortInfo";
import {IFoodAndDrinkShortInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkShortInfo";

export interface IReviewWithCreatorAndFoodAndDrink extends IReview {
    creator: IUserShortInfo,
    foodAndDrink: IFoodAndDrinkShortInfo
}