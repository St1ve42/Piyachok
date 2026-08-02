import {IFoodAndDrinkOwnerInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOwnerInfo";
import {IUser} from "@/src/interfaces/users/IUser";

export interface IFoodAndDrinkSuperadminInfo extends IFoodAndDrinkOwnerInfo{
    customRating: number | null
    owner: Pick<IUser, 'id' | 'name' | 'surname' | 'photo' | 'email'>
}