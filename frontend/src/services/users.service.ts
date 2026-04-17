import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IUser} from "@/src/interfaces/IUser";
import {getErrorResponse} from "@/src/errors/get.error.response";
import {fetchWithTokenRefresh} from "@/src/lib/fetchWithTokenRefresh";

export class UsersService{
    async me(requestOptions?: RequestInit): Promise<IApiResponse<IUser>>{
        try{
            const response = await fetchWithTokenRefresh<IUser>(`/users/me`, {credentials: "include", cache: "no-cache", ...requestOptions})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse<IUser>(e)
        }
    }
}

export const userService = new UsersService()