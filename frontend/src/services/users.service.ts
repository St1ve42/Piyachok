import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IUser} from "@/src/interfaces/users/IUser";
import {getErrorResponse} from "@/src/errors/get.error.response";
import {fetchApi} from "@/src/lib/fetch.api";

export class UsersService{
    async me(requestOptions?: RequestInit): Promise<IApiResponse<IUser>>{
        try{
            const response = await fetchApi<IUser>(`/users/me`, {credentials: "include", cache: "no-cache", ...requestOptions})
            return {success: true, ...response}
        }
        catch (e){
            console.log(`Сталась помилка в ${this.me.name}: `, e)
            return getErrorResponse(e)
        }
    }
}

export const userService = new UsersService()