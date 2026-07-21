import Joi from "joi";
import {basePaginationSchema} from "@/src/validators/shared/base.pagination.schema";
import {NewsCategoryEnum} from "@/src/enums/news/news-category.enum";
import {IBaseQuery} from "@/src/interfaces/shared/IBaseQuery";

export interface queryNewsType extends IBaseQuery {
    category?: NewsCategoryEnum,
    search?: string
}

export const queryNews = Joi.object({
    ...basePaginationSchema,
    search: Joi.string(),
    category: Joi.string().valid(...Object.values(NewsCategoryEnum)).default(NewsCategoryEnum.GENERAL)
})

