import {UserReviewSearchByEnum} from "@/src/enums/review/UserReviewSearchByEnum";

export const UserReviewSearchByTranslation: Record<UserReviewSearchByEnum, string> = {
    [UserReviewSearchByEnum.NAME]: 'Ім`я закладу',
    [UserReviewSearchByEnum.TEXT]: 'Текст відгуку',
}