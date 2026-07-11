import {IUserCommentInput} from "@/src/interfaces/comments/IUserCommentInput";

export interface ICreateComment extends IUserCommentInput {
    foodAndDrinkId: string
}