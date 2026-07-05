import {ICreateUserInputReview} from "@/src/interfaces/reviews/ICreateUserInputReview";
import {IReview} from "@/src/interfaces/reviews/IReview";

export type ICreateReview = ICreateUserInputReview & Pick<IReview, 'rating'> & {foodAndDrinkId: string}