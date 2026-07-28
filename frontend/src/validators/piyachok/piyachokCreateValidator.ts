import Joi from "joi"
import {GenderEnum} from "@/src/enums/user/gender.enum";
import {PaymentTypeEnum} from "@/src/enums/piyachok/payment-type.enum";

export const piyachokCreateValidator = Joi.object({
    purpose: Joi.string().min(2).max(255),
    meetDate: Joi.object(),
    meetTime: Joi.object(),
    targetGender: Joi.string().valid(...Object.values(GenderEnum)),
    peopleCount: Joi.number().min(2).max(100),
    paymentType: Joi.string().valid(...Object.values(PaymentTypeEnum)).default(PaymentTypeEnum.SPLIT),
    budget: Joi.number().min(1)
})