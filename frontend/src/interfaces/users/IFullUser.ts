import {IUser} from "@/src/interfaces/users/IUser";

export interface IFullUser extends IUser {
    "createdAt": string,
    "updatedAt": string,
}