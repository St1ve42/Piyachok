import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IUser} from "@/src/interfaces/IUser";
import {fetchApi} from "@/src/shared/fetch.api";
import {getErrorResponse} from "@/src/errors/get.error.response";

export class UsersService{
    async me(): Promise<IApiResponse<IUser>>{
        try{
            const response = await fetchApi<IUser>(`/users/me`, {credentials: "include", cache: "force-cache"})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse<IUser>(e)
        }
    }
}

export const userService = new UsersService()