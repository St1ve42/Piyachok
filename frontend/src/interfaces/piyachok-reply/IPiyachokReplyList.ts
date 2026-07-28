import {IUserShortInfo} from "@/src/interfaces/users/IUserShortInfo";

export interface IPiyachokReplyList {
    id: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    responder: IUserShortInfo;
}