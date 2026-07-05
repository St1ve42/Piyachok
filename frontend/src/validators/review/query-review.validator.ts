import Joi from 'joi';
import {SortEnum} from "@/src/enums/shared/SortEnum";
import {ReviewSortByEnum} from "@/src/enums/ReviewSortByEnum";

export type queryReviewType = {
    page: number,
    limit: number,
    rating?: number,
    sort?: SortEnum,
    sortBy?: ReviewSortByEnum
}

export const basePaginationSchema = {
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(20)
}

export const createSortSchema = (sortByEnum: Record<string, string>) => {
    return {
        sort: Joi.string().valid(...Object.values(SortEnum)),
        sortBy: Joi.string().valid(...Object.values(sortByEnum))
    }
}
export const reviewSortSchema = createSortSchema(ReviewSortByEnum)

export const queryReviewValidator = Joi.object({
    ...basePaginationSchema,
    rating: Joi.number().min(0).max(5),
    ...reviewSortSchema,
})
