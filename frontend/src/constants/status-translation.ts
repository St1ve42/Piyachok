import {FoodAndDrinkStatusEnum} from "@/src/enums/food-and-drink/food-and-drink-status.enum";

export const statusTranslation: Record<FoodAndDrinkStatusEnum, string> = {
    [FoodAndDrinkStatusEnum.ACTIVE]: 'активний',
    [FoodAndDrinkStatusEnum.PENDING]: 'в очікуванні',
    [FoodAndDrinkStatusEnum.INACTIVE]: 'неактивний'
}