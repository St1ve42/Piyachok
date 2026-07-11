import Joi from "joi";

export const contactFoodAndDrinkValidator = Joi.object({
    email: Joi.string().email(),
    subject: Joi.string().max(100),
    message: Joi.string().max(800)
})