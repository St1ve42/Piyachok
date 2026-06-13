import Joi from "joi";

export const userQueryValidator = Joi.object({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(20),
    nameAndSurname: Joi.string(),
    sort: Joi.string().valid('asc', 'desc'),
    sortBy: Joi.string(),
    searchBy: Joi.string()
})