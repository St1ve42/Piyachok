import Joi from "joi";
import {credentialsSchema} from "@/src/validators/shared/credentials.schema";

export const forgotPasswordValidator = Joi.object({
    email: credentialsSchema.email
})
