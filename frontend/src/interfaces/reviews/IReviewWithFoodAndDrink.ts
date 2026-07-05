import {IReview} from "@/src/interfaces/reviews/IReview";
import {IFoodAndDrinkShortInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkShortInfo";

export interface IReviewWithFoodAndDrink extends IReview {
    foodAndDrink: IFoodAndDrinkShortInfo;
}
