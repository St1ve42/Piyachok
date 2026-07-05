import Joi from "joi";

export const createReviewValidator = Joi.object({
    averageReceipt: Joi.number().min(1),
    text: Joi.string().min(50).max(500)
})