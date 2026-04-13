import Joi from "joi";
import {credentialsSchema} from "@/src/validators/credentials.schema";

export const recoveryValidator = Joi.object({
    password: credentialsSchema.password
})