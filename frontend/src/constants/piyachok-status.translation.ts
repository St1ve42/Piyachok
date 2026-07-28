import {PiyachokStatusEnum} from "@/src/enums/piyachok/piyachok-status.enum";

export const PiyachokStatusTranslation: Record<PiyachokStatusEnum, string> = {
    [PiyachokStatusEnum.ACTIVE]: 'активний',
    [PiyachokStatusEnum.CANCELLED]: 'скасовано',
    [PiyachokStatusEnum.COMPLETED]: 'завершено'
}