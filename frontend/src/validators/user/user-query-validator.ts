import Joi from "joi";
import {UserSearchByEnum} from "@/src/enums/user/user-search-by.enum";
import {SortEnum} from "@/src/enums/shared/SortEnum";

export const userQueryValidator = Joi.object({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(20).default(5),
    sort: Joi.string().valid('asc', 'desc'),
    sortBy: Joi.string(),
    searchBy: Joi.string().valid(...Object.values(UserSearchByEnum)),
    search: Joi.string()
})

export type userQueryValidatorType = {
    page: number,
    limit: number,
    sort?: SortEnum,
    sortBy?: string,
    searchBy?: UserSearchByEnum,
    search?: string
}