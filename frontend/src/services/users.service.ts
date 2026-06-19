import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IUser} from "@/src/interfaces/users/IUser";
import {getErrorResponse} from "@/src/errors/get.error.response";
import {fetchApi} from "@/src/lib/fetch.api";
import {IUpdateMe} from "@/src/interfaces/users/IUpdateMe";
import {IFoodAndDrinkOwnerInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOwnerInfo";
import {IFoodAndDrinkListData} from "@/src/interfaces/food-and-drink/IFoodAndDrinkListData";
import {IFoodAndDrinkQuery} from "@/src/interfaces/shared/IBaseQuery";
import {QueryDirector} from "@/src/lib/query.director";

export class UsersService{
    async me(requestOptions?: RequestInit): Promise<IApiResponse<IUser>>{
        try{
            const response = await fetchApi<IUser>(`/users/me`, {cache: 'no-store',...requestOptions})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async updateMe(updateDto: IUpdateMe, requestOptions?: RequestInit): Promise<IApiResponse>{
        try{
            const response = await fetchApi(`/users/me`, {method: 'PATCH', body: JSON.stringify(updateDto), ...requestOptions})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async deleteMe(requestOptions?: RequestInit): Promise<IApiResponse>{
      try{
        const response = await fetchApi(`/users/me`, {method: 'DELETE', ...requestOptions})
        return {success: true, ...response}
      }
      catch (e){
        return getErrorResponse(e)
      }
    }

    async uploadPhoto(uploadPhotoDto: FormData, requestOptions?: RequestInit): Promise<IApiResponse>{
        try{
            const response = await fetchApi(`/users/me/photo`, {method: 'POST', body: uploadPhotoDto, ...requestOptions})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async deletePhoto(requestOptions?: RequestInit): Promise<IApiResponse>{
        try{
            const response = await fetchApi(`/users/me/photo`, {method: 'DELETE', ...requestOptions})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async findMyFoodAndDrink(requestOptions?: RequestInit): Promise<IApiResponse<IFoodAndDrinkOwnerInfo>>{
        try{
            const response = await fetchApi<IFoodAndDrinkOwnerInfo>(`/users/me/food-and-drink`, {cache: 'no-store', ...requestOptions})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async findMyFavouriteFoodAndDrinks(query?: IFoodAndDrinkQuery, requestOptions?: RequestInit): Promise<IApiResponse<IFoodAndDrinkListData>>{
        try{
            const endpoint = '/users/me/favourites';
            const queryDirector = new QueryDirector(endpoint, query);
            const fullEndpoint = queryDirector.build();
            const response = await fetchApi<IFoodAndDrinkListData>(fullEndpoint, {cache: 'no-store', ...requestOptions})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }
}

export const userService = new UsersService()