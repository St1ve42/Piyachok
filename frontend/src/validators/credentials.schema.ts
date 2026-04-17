import Joi from "joi";

export const credentialsSchema = {
    email: Joi.string().email().required().label('Імейл'),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/).required().label('Пароль').messages({
        'string.pattern.base': 'Пароль повинен містити принаймні 8 символів, 1 велику літеру, 1 маленьку літеру, 1 цифру, 1 символ та не перевищувати 16 символів.'
    }),
    repeatedPassword: Joi.string()
        .valid(Joi.ref('password'))
        .label('Повторіть пароль')
        .messages({ 'any.only': 'Паролі не збігаються' })
}