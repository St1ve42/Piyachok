import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IUser} from "@/src/interfaces/users/IUser";
import {getErrorResponse} from "@/src/errors/get.error.response";
import {fetchApi} from "@/src/lib/fetch.api";
import {IUpdateMe} from "@/src/interfaces/users/IUpdateMe";
import {IFoodAndDrinkOwnerInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOwnerInfo";
import { IFoodAndDrinkFullData } from "@/src/interfaces/food-and-drink/IFoodAndDrinkFullData";
import {
  IBaseQuery,
} from "@/src/interfaces/shared/IBaseQuery";
import {IReviewWithFoodAndDrinkListData} from "@/src/interfaces/reviews/IReviewWithFoodAndDrinkListData";
import {ICommentWithFoodAndDrinkListData} from "@/src/interfaces/comments/ICommentWithFoodAndDrinkListData";
import {fetchApi20} from "@/src/lib/fetch.api.2.0";

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

    async findMyFavouriteFoodAndDrinks(query?: IBaseQuery, accessCookie?: string): Promise<IApiResponse<IFoodAndDrinkFullData>>{
        const endpoint = '/users/me/favourites';
        const baseHeaders: RequestInit = {next: {revalidate: 15, tags: ['my-favourite-food-and-drinks']}}
        return await fetchApi20<IFoodAndDrinkFullData>(endpoint, baseHeaders, {query, accessCookie})
    }

    async findMyReviews(query?: IBaseQuery, accessCookie?: string): Promise<IApiResponse<IReviewWithFoodAndDrinkListData>>{
        const endpoint = '/users/me/reviews';
        const baseHeaders: RequestInit = {next: {revalidate: 15, tags: ['my-reviews']}}
        return await fetchApi20<IReviewWithFoodAndDrinkListData>(endpoint, baseHeaders, {query, accessCookie})
    }

    async findMyComments(query?: IBaseQuery, accessCookie?: string): Promise<IApiResponse<ICommentWithFoodAndDrinkListData>>{
        const endpoint = '/users/me/comments';
        const baseHeaders: RequestInit = {next: {revalidate: 15, tags: ['my-comments']}}
        return await fetchApi20<ICommentWithFoodAndDrinkListData>(endpoint, baseHeaders, {query, accessCookie})
    }
}

export const userService = new UsersService()