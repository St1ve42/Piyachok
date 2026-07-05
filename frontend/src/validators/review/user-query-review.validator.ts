import Joi from "joi";
import {
  basePaginationSchema,
  reviewSortSchema,
} from "@/src/validators/review/query-review.validator";
import {UserReviewSearchByEnum} from "@/src/enums/review/UserReviewSearchByEnum";
import {ReviewSortByEnum} from "@/src/enums/ReviewSortByEnum";
import {SortEnum} from "@/src/enums/shared/SortEnum";

export type userQueryReviewType = {
    page: number,
    limit: number,
    rating?: number,
    searchBy?: UserReviewSearchByEnum,
    search?: string
    sortBy?: ReviewSortByEnum,
    sort?: SortEnum
}

export const userQueryReviewValidator = Joi.object({
    ...basePaginationSchema,
    ...reviewSortSchema,
    rating: Joi.number().valid(...[1,2,3,4,5]),
    searchBy: Joi.string().valid(...Object.values(UserReviewSearchByEnum)),
    search: Joi.string()
})