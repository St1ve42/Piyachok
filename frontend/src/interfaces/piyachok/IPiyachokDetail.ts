import {IPiyachokList} from "@/src/interfaces/piyachok/IPiyachokList";
import {IUserShortInfo} from "@/src/interfaces/users/IUserShortInfo";
import {PaymentTypeEnum} from "@/src/enums/piyachok/payment-type.enum";

export interface IPiyachokDetail extends IPiyachokList {
    creator: IUserShortInfo;
    targetGender: string;
    peopleCount: number;
    paymentType: PaymentTypeEnum;
    budget: number;
    createdAt: string;
    updatedAt: string;
}



