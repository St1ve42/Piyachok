import {PaymentTypeEnum} from "@/src/enums/piyachok/payment-type.enum";

export const PiyachokPaymentTypeTranslation: Record<PaymentTypeEnum, string> = {
    [PaymentTypeEnum.SPLIT]: 'роздільний',
    [PaymentTypeEnum.CREATOR_PAYS]: 'платить організатор',
    [PaymentTypeEnum.GUEST_PAYS]: 'платять гості',
}