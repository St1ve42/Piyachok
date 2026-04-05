import Joi from "joi";

export const signUpValidator = Joi.object({
    name: Joi.string().min(3).max(50).trim().required().label('Ім`я'),
    surname: Joi.string().min(3).max(50).trim().required().label('Прізвище'),
    age: Joi.number().integer().min(1).required().label('Вік'),
    email: Joi.string().email().required().label('Імейл'),
    regionId: Joi.number().required().label('Регіон'),
    regionName: Joi.string(),
    cityName: Joi.string(),
    cityId: Joi.number().required().label('Місто'),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/).required().label('Пароль').messages({
        'string.pattern.base': 'Пароль повинен містити принаймні 8 символів, 1 велику літеру, 1 маленьку літеру, 1 цифру, 1 символ та не перевищувати 16 символів.'
    })
})