import Joi from "joi";
import {
  basePaginationSchema,
  createSortSchema,
} from "@/src/validators/review/query-review.validator";
import {IBaseQuery} from "@/src/interfaces/shared/IBaseQuery";
import {CommentSearchByEnum} from "@/src/enums/comments/CommentSearchByEnum";
import {CommentsSortByEnum} from "@/src/enums/comments/CommentsSortByEnum";
import {SortEnum} from "@/src/enums/shared/SortEnum";

export interface IQueryComments extends IBaseQuery{
    searchBy?: CommentSearchByEnum
    search?: string,
    sortBy?: CommentsSortByEnum,
    sort?: SortEnum
}

const commentSortBy = createSortSchema(CommentsSortByEnum)

export const queryCommentsValidator = Joi.object({
    ...basePaginationSchema,
    searchBy: Joi.string().valid(...Object.values(CommentSearchByEnum)),
    search: Joi.string(),
    ...commentSortBy
})