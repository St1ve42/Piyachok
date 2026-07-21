import Joi from 'joi';

export const updateMeValidator = Joi.object({
    name: Joi.string().min(2).max(50).trim().optional().label('Ім\'я'),
    surname: Joi.string().min(2).max(50).trim().optional().label('Прізвище'),
    age: Joi.number().integer().min(1).max(100).optional().label('Вік'),
    phone: Joi.string()
        .pattern(/^\+?380\d{9}$/)
        .optional()
        .label('Телефон')
        .messages({
            'string.pattern.base': 'Телефон повинен бути вигляду +380501234567',
        }).allow(null, ''),
    gender: Joi.string()
        .valid('male', 'female', 'reset')
        .optional()
        .label('Стать'),
    regionId: Joi.number().optional().label('Регіон'),
    cityId: Joi.number().optional().label('Місто'),
}).min(1).messages({
    'object.min': 'Змініть принаймні одне поле',
});
