import Joi from "joi";
import {credentialsSchema} from "@/src/validators/shared/credentials.schema";

export const signInValidator = Joi.object({
    email: credentialsSchema.email,
    password: Joi.string().required()
})