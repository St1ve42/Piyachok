import { EmailTypeEnum } from '../enums/email-type.enum';

interface IEmailCombinedPayload {
    name: string;
    token: string;
}

export interface IEmailPayload {
    [EmailTypeEnum.ACTIVATION]: IEmailCombinedPayload;
    [EmailTypeEnum.FORGOT_PASSWORD]: IEmailCombinedPayload;
    [EmailTypeEnum.CONFIRM_FOOD_AND_DRINK_EMAIL]: Pick<
        IEmailCombinedPayload,
        'token'
    >;
}
