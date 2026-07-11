import Joi from "joi";

export const CommentsValidator = Joi.object({
    text: Joi.string()
})