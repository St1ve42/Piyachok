import Joi from "joi";
import {FoodAndDrinkTypeEnum} from "@/src/enums/food-and-drink/food-and-drink-type.enum";
import {FoodAndDrinkDaysEnum} from "@/src/enums/food-and-drink/food-and-drink-days.enum";

export const createFoodAndDrinkValidator = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(50).max(1000).required(),
    type: Joi.number().valid(...Object.values(FoodAndDrinkTypeEnum)).required(),
    averageReceipt: Joi.number().min(0).required(),
    email: Joi.string().email(),
    cityId: Joi.number().required(),
    businessHours: Joi.array().items(Joi.object({
        day: Joi.string().required().valid(...Object.values(FoodAndDrinkDaysEnum)),
        open: Joi.string().required().regex(/^([01]\d|2[0-3]):[0-5]\d$/).messages({
            'string.pattern.base': "Час повинен бути формату 00:00",
        }),
        close: Joi.string().required().regex(/^([01]\d|2[0-3]):[0-5]\d$/).messages({
            'string.pattern.base': "Час повинен бути формату 00:00"
        }),
    })).unique('day').required(),
    features: Joi.array().items(Joi.string()),
    street: Joi.string().min(3).max(100).required(),
    tags: Joi.array().items(Joi.string().min(3).max(50)).min(1),
    phone: Joi.string().pattern(/^\+?3?8?(0\d{9})$/).required().messages({
        'string.pattern.base': 'Телефон має бути вигляду +380000000000'
    }),
    site: Joi.string().uri().allow('').messages({
        'string.uri': 'Невірний формат URL сайту',
    }),
    instagram: Joi.string().uri().allow('').regex(/^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/).optional().messages({
        'string.uri': 'Невірний формат URL Instagram',
    }),
    facebook: Joi.string().uri().allow('').regex(/^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9_.]+\/?$/).optional().messages({
        'string.uri': 'Невірний формат URL Facebook',
    }),
    x: Joi.string().uri().allow('').regex(/^https:\/\/(www\.)?x\.com\/[a-zA-Z0-9_.]+\/?$/).optional().messages({
        'string.uri': 'Невірний формат URL X',
    }),
    telegram: Joi.string().uri().allow('').regex(/^(https?:\/\/)?(www\.)?(t\.me|telegram\.me)\/[a-zA-Z0-9_]{5,}\/?$/).optional().messages({
        'string.uri': 'Невірний формат URL Telegram',
    })
});

