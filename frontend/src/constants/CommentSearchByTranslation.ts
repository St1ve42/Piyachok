import {UserReviewSearchByEnum} from "@/src/enums/review/UserReviewSearchByEnum";
import {CommentSearchByEnum} from "@/src/enums/comments/CommentSearchByEnum";

export const CommentSearchByTranslation: Record<CommentSearchByEnum, string> = {
    [UserReviewSearchByEnum.FOOD_AND_DRINK_NAME]: 'Ім`ям закладу',
    [UserReviewSearchByEnum.USER_NAME]: 'Ім`ям користувача',
    [UserReviewSearchByEnum.TEXT]: 'Текст відгуку',
}