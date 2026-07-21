import Joi from "joi";

export const createNewsSchema = Joi.object({
    title: Joi.string().min(10).max(100).required().messages({
        'string.empty': 'Заголовок є обов\'язковим',
        'string.max': 'Заголовок не може перевищувати 50 символів'
    }),
    text: Joi.string().min(100).max(1000).required().messages({
        'string.empty': 'Текст є обов\'язковим',
        'string.max': 'Текст не може перевищувати 1000 символів'
    })
})