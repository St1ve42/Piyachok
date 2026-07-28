import Joi from "joi";

export const basePaginationSchema = {
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(20)
}

export const basePaginationValidator = Joi.object(basePaginationSchema)