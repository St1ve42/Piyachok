import {IReview} from "@/src/interfaces/reviews/IReview";
import {IUserShortInfo} from "@/src/interfaces/users/IUserShortInfo";

export interface IReviewWithCreator extends IReview{
    creator: IUserShortInfo
}