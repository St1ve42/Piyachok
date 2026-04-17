import { EmailTypeEnum } from '../enums/email-type.enum';

export const EmailConst = {
    [EmailTypeEnum.ACTIVATION]: {
        subject: "Активація акаунту на платформі 'Пиячок'",
        template: 'activation',
    },
    [EmailTypeEnum.FORGOT_PASSWORD]: {
        subject: "Відновлення паролю для акаунту на платформі 'Пиячок'",
        template: 'forgot-password',
    },
};
