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
    [EmailTypeEnum.CONFIRM_FOOD_AND_DRINK_EMAIL]: {
        subject: 'Підтвердження електронної пошти закладу',
        template: 'confirm-food-and-drink-email',
    },
};
