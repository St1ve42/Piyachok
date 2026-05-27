import Joi from "joi";
import {credentialsSchema} from "@/src/validators/shared/credentials.schema";

export const recoveryValidator = Joi.object({
    password: credentialsSchema.password,
    repeatedPassword: credentialsSchema.repeatedPassword
})