import Joi from "joi";
import {credentialsSchema} from "@/src/validators/credentials.schema";

export const signUpValidator = Joi.object({
    name: Joi.string().min(3).max(50).trim().required().label('Ім`я'),
    surname: Joi.string().min(3).max(50).trim().required().label('Прізвище'),
    age: Joi.number().integer().min(1).required().label('Вік'),
    regionId: Joi.number().required().label('Регіон'),
    cityId: Joi.number().required().label('Місто'),
    ...credentialsSchema
})