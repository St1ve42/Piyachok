import Joi from "joi";

export const SuperadminFoodAndDrinkUpdateValidator = Joi.object({
    customRating: Joi.number().min(0).max(5),
})