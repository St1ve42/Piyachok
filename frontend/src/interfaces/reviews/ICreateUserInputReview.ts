import {IReview} from "@/src/interfaces/reviews/IReview";

export type ICreateUserInputReview = Pick<IReview, 'averageReceipt' | 'text'>