import Joi from "joi";
import {credentialsSchema} from "@/src/validators/credentials.schema";

export const signInValidator = Joi.object(credentialsSchema)