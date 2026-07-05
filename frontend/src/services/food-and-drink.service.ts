import {
  IFoodAndDrinkQuery,
  IReviewQuery,
} from "@/src/interfaces/shared/IBaseQuery";
import { QueryDirector } from '@/src/lib/query.director';
import {getErrorResponse} from "@/src/errors/get.error.response";
import {fetchApi} from "@/src/lib/fetch.api";
import {IFoodAndDrinkListData} from "@/src/interfaces/food-and-drink/IFoodAndDrinkListData";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {ICreateFoodAndDrinkDto} from "@/src/interfaces/food-and-drink/ICreateFoodAndDrink";
import {IFoodAndDrinkOwnerInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOwnerInfo";
import {IFoodAndDrinkById} from "@/src/interfaces/food-and-drink/IFoodAndDrinkById";
import {IFoodAndDrinkTotalStatistics} from "@/src/interfaces/food-and-drink/IFoodAndDrinkTotalStatistics";
import {IFoodAndDrinkViewStatistics} from "@/src/interfaces/food-and-drink/IFoodAndDrinkViewStatistics";
import {IFoodAndDrinkViewStatisticsQuery} from "@/src/interfaces/food-and-drink/IFoodAndDrinkViewStatisticsQuery";
import {IFoodAndDrinReviewStatisticsListData} from "@/src/interfaces/food-and-drink/IFoodAndDrinReviewStatistics";
import {IReviewWithCreatorListData} from "@/src/interfaces/reviews/IReviewWithCreatorListData";

export class FoodAndDrinkService {
    async find(query?: IFoodAndDrinkQuery, requestInit?: RequestInit):Promise<IApiResponse<IFoodAndDrinkListData>> {
        try{
            const endpoint = '/food-and-drinks';
            const queryDirector = new QueryDirector(endpoint, query);
            const fullEndpoint = queryDirector.build();
            const foodAndDrinkList = await fetchApi<IFoodAndDrinkListData>(fullEndpoint, {next: {revalidate: 15, tags: ['food-and-drink-list']}, ...requestInit})
            return {success: true, ...foodAndDrinkList}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async findTypes():Promise<IApiResponse<Record<string, string>>> {
        try{
            const endpoint = '/food-and-drinks/types';
            const foodAndDrinkList = await fetchApi<Record<string, string>>(endpoint)
            return {success: true, ...foodAndDrinkList}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async findFeatures():Promise<IApiResponse<Record<string, string>>> {
        try{
            const endpoint = '/food-and-drinks/features';
            const foodAndDrinkList = await fetchApi<Record<string, string>>(endpoint)
            return {success: true, ...foodAndDrinkList}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async findById(id: string, requestInit?: RequestInit):Promise<IApiResponse<IFoodAndDrinkById>> {
        try{
            const endpoint = `/food-and-drinks/${id}`;
            const foodAndDrinkById = await fetchApi<IFoodAndDrinkById>(endpoint, {next: {revalidate: 15, tags: ['food-and-drink-by-id']}, ...requestInit})
            return {success: true, ...foodAndDrinkById}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async create(body: ICreateFoodAndDrinkDto):Promise<IApiResponse<IFoodAndDrinkOwnerInfo>> {
        try{
            const endpoint = `/food-and-drinks`;
            const response = await fetchApi<IFoodAndDrinkOwnerInfo>(endpoint, {method: "POST", body: JSON.stringify(body)})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async update(id: string, body: Partial<ICreateFoodAndDrinkDto>):Promise<IApiResponse> {
      try{
        const endpoint = `/food-and-drinks/${id}`;
        const response = await fetchApi(endpoint, {method: "PATCH", body: JSON.stringify(body)})
        return {success: true, ...response}
      }
      catch (e){
         return getErrorResponse(e)
      }
    }

    async delete(id: string):Promise<IApiResponse> {
        try{
            const endpoint = `/food-and-drinks/${id}`;
            const response = await fetchApi(endpoint, {method: "DELETE"})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async uploadImages(id: string, body: FormData):Promise<IApiResponse> {
        try{
            const endpoint = `/food-and-drinks/${id}/images`;
            const response = await fetchApi(endpoint, {method: "POST", body})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async toggleFavourite(id: string): Promise<IApiResponse> {
        try{
            const endpoint = `/food-and-drinks/${id}/favourites`;
            const response = await fetchApi(endpoint, {method: "POST"})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async findTotalStatistics(id: string): Promise<IApiResponse<IFoodAndDrinkTotalStatistics>> {
        try{
            const endpoint = `/food-and-drinks/${id}/statistics`;
            const response = await fetchApi<IFoodAndDrinkTotalStatistics>(endpoint, {next: {tags: ['totalStatistics']}})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async findViewStatistics(id: string, query: IFoodAndDrinkViewStatisticsQuery, requestInit?: RequestInit): Promise<IApiResponse<IFoodAndDrinkViewStatistics>> {
        try{
            const endpoint = `/food-and-drinks/${id}/views`;
            const queryDirector = new QueryDirector(endpoint, query)
            const fullEndpoint = queryDirector.build()
            const response = await fetchApi<IFoodAndDrinkViewStatistics>(fullEndpoint, {...requestInit})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async findReviewStatistics(id: string, requestInit?: RequestInit): Promise<IApiResponse<IFoodAndDrinReviewStatisticsListData>> {
        try{
            const endpoint = `/food-and-drinks/${id}/reviews/statistics`;
            const response = await fetchApi<IFoodAndDrinReviewStatisticsListData>(endpoint, {...requestInit})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async findReviews(id: string, query?: IReviewQuery, requestInit?: RequestInit): Promise<IApiResponse<IReviewWithCreatorListData>> {
        try{
            const endpoint = `/food-and-drinks/${id}/reviews`;
            const queryDirector = new QueryDirector(endpoint, query);
            const fullEndpoint = queryDirector.build();
            const response = await fetchApi<IReviewWithCreatorListData>(fullEndpoint, {...requestInit})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }
}

export const foodAndDrinkService = new FoodAndDrinkService()