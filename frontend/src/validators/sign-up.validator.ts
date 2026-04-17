import Joi from "joi";
import {credentialsSchema} from "@/src/validators/credentials.schema";

const baseFields = {
    name: Joi.string().min(3).max(50).trim().required().label('Ім`я'),
    surname: Joi.string().min(3).max(50).trim().required().label('Прізвище'),
    age: Joi.number().integer().min(1).max(100).required().label('Вік'),
    regionId: Joi.number().not(0).required().label('Регіон').messages({
        'any.invalid': 'Регіон є необхідний'
    }),
    cityId: Joi.number().not(0).required().label('Місто').messages({
        'any.invalid': 'Місто є необхідним'
    }),
};

export const getSignUpValidator = (hasExternalData: boolean) => {
    const requirement = hasExternalData ? Joi.string().optional() : Joi.string().required();

    return Joi.object({
        ...baseFields,
        email: credentialsSchema.email.concat(requirement),
        password: credentialsSchema.password.concat(requirement),
        repeatedPassword: credentialsSchema.repeatedPassword.concat(requirement)
    });
};