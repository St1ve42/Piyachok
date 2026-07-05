import Joi from "joi";

export const ReviewComplaintValidator = Joi.object({
    reason: Joi.string().max(200)
})