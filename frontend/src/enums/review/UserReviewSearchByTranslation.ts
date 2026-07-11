import {UserReviewSearchByEnum} from "@/src/enums/review/UserReviewSearchByEnum";

export const UserReviewSearchByTranslation: Record<UserReviewSearchByEnum, string> = {
    [UserReviewSearchByEnum.FOOD_AND_DRINK_NAME]: 'Ім`ям закладу',
    [UserReviewSearchByEnum.USER_NAME]: 'Ім`ям користувача',
    [UserReviewSearchByEnum.TEXT]: 'Текст відгуку',
}