import {IFoodAndDrinkShortInfoForPiyachok} from "@/src/interfaces/food-and-drink/IFoodAndDrinkShortInfoForPiyachok";
import {PiyachokStatusEnum} from "@/src/enums/piyachok/piyachok-status.enum";

export interface IPiyachokList {
    id: string;
    meetDate: string;
    meetTime: string;
    purpose: string;
    status: PiyachokStatusEnum;
    foodAndDrink: IFoodAndDrinkShortInfoForPiyachok;
}