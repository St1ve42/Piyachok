import Joi from "joi";
import {credentialsSchema} from "@/src/validators/shared/credentials.schema";

export const ChangePasswordValidator = Joi.object({
    oldPassword: Joi.string().messages({
        'string.empty': 'Пароль не має бути порожнім'
    }),
    newPassword: credentialsSchema.password,
    repeatedNewPassword: credentialsSchema.repeatedPassword.valid(Joi.ref('newPassword'))
})
