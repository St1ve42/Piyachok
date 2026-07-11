import {IUserShortInfo} from "@/src/interfaces/users/IUserShortInfo";
import {IComment} from "@/src/interfaces/comments/IComment";

export interface ICommentWithUser extends IComment{
    user: IUserShortInfo
}