import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IUser} from "@/src/interfaces/users/IUser";
import {getErrorResponse} from "@/src/errors/get.error.response";
import {fetchApi} from "@/src/lib/fetch.api";
import {IUpdateUser} from "@/src/interfaces/users/IUpdateUser";
import {IFoodAndDrinkOwnerInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOwnerInfo";

export class UsersService{
    async me(requestOptions?: RequestInit): Promise<IApiResponse<IUser>>{
        try{
            const response = await fetchApi<IUser>(`/users/me`, {...requestOptions})
            return {success: true, ...response}
        }
        catch (e){
            console.log(`Сталась помилка в ${this.me.name}: `, e)
            return getErrorResponse(e)
        }
    }

    async updateMe(updateDto: IUpdateUser,requestOptions?: RequestInit): Promise<IApiResponse<IUser>>{
        try{
            const response = await fetchApi<IUser>(`/users/me`, {method: 'PATCH', body: JSON.stringify(updateDto), ...requestOptions})
            return {success: true, ...response}
        }
        catch (e){
            console.log(`Сталась помилка в ${this.me.name}: `, e)
            return getErrorResponse(e)
        }
    }

    async uploadPhoto(uploadPhotoDto: FormData, requestOptions?: RequestInit): Promise<IApiResponse<IUser>>{
        try{
            const response = await fetchApi<IUser>(`/users/me/photo`, {method: 'POST', body: uploadPhotoDto, ...requestOptions})
            return {success: true, ...response}
        }
        catch (e){
            console.log(`Сталась помилка в ${this.me.name}: `, e)
            return getErrorResponse(e)
        }
    }

    async deletePhoto(requestOptions?: RequestInit): Promise<IApiResponse<IUser>>{
        try{
            const response = await fetchApi<IUser>(`/users/me/photo`, {method: 'DELETE', ...requestOptions})
            return {success: true, ...response}
        }
        catch (e){
            console.log(`Сталась помилка в ${this.me.name}: `, e)
            return getErrorResponse(e)
        }
    }

    async findMyFoodAndDrink(requestOptions?: RequestInit): Promise<IApiResponse<IFoodAndDrinkOwnerInfo>>{
        try{
            const response = await fetchApi<IFoodAndDrinkOwnerInfo>(`/users/me/food-and-drink`, {...requestOptions})
            return {success: true, ...response}
        }
        catch (e){
            console.log(`Сталась помилка в ${this.me.name}: `, e)
            return getErrorResponse(e)
        }
    }
}

export const userService = new UsersService()