import {
  IFoodAndDrinkCommentQuery,
  IFoodAndDrinkQuery,
  IReviewQuery,
} from "@/src/interfaces/shared/IBaseQuery";
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
import {ICommentWithUserListData} from "@/src/interfaces/comments/ICommentWithUserListData";
import {ICommentWithFoodAndDrinkListData} from "@/src/interfaces/comments/ICommentWithFoodAndDrinkListData";
import {fetchApi20} from "@/src/lib/fetch.api.2.0";
import {IContactFoodAndDrink} from "@/src/interfaces/food-and-drink/IContactFoodAndDrink";

export class FoodAndDrinkService {
    async find(query?: IFoodAndDrinkQuery):Promise<IApiResponse<IFoodAndDrinkListData>> {
        const endpoint = '/food-and-drinks';
        const baseRequestOptions: RequestInit = {next: {revalidate: 15, tags: ['food-and-drink-list']}}
        return await fetchApi20<IFoodAndDrinkListData>(endpoint, baseRequestOptions, {query})
    }

    async findTypes():Promise<IApiResponse<Record<string, string>>> {
        const endpoint = '/food-and-drinks/types';
        const baseRequestOptions: RequestInit = {}
        return await fetchApi20<Record<string, string>>(endpoint, baseRequestOptions)
    }

    async findFeatures():Promise<IApiResponse<Record<string, string>>> {
        const endpoint = '/food-and-drinks/features';
        const baseRequestOptions: RequestInit = {}
        return await fetchApi20<Record<string, string>>(endpoint, baseRequestOptions)
    }

    async findById(id: string, accessCookie?: string):Promise<IApiResponse<IFoodAndDrinkById>> {
        const endpoint = `/food-and-drinks/${id}`;
        const baseRequestOptions: RequestInit = {next: {revalidate: 15, tags: ['food-and-drink-by-id']}}
        return await fetchApi20<IFoodAndDrinkById>(endpoint, baseRequestOptions, {accessCookie})
    }

    async create(body: ICreateFoodAndDrinkDto):Promise<IApiResponse<IFoodAndDrinkOwnerInfo>> {
        const endpoint = `/food-and-drinks`;
        const baseRequestOptions: RequestInit = {method: "POST", body: JSON.stringify(body)}
        return await fetchApi20<IFoodAndDrinkOwnerInfo>(endpoint, baseRequestOptions)
    }

    async update(id: string, body: Partial<ICreateFoodAndDrinkDto>):Promise<IApiResponse> {
        const endpoint = `/food-and-drinks/${id}`;
        const baseRequestOptions: RequestInit = {method: "PATCH", body: JSON.stringify(body)}
        return await fetchApi20(endpoint, baseRequestOptions)
    }

    async delete(id: string): Promise<IApiResponse> {
        const endpoint = `/food-and-drinks/${id}`;
        const baseRequestOptions: RequestInit = {method: "DELETE"}
        return await fetchApi20(endpoint, baseRequestOptions)
    }

    async uploadImages(id: string, body: FormData): Promise<IApiResponse> {
        const endpoint = `/food-and-drinks/${id}/images`;
        const baseRequestOptions: RequestInit = {method: "POST", body}
        return await fetchApi20(endpoint, baseRequestOptions)
    }

    async toggleFavourite(id: string): Promise<IApiResponse> {
        const endpoint = `/food-and-drinks/${id}/favourites`;
        const baseRequestOptions: RequestInit = {method: "POST"}
        return await fetchApi20(endpoint, baseRequestOptions)
    }

    async findTotalStatistics(id: string): Promise<IApiResponse<IFoodAndDrinkTotalStatistics>> {
        const endpoint = `/food-and-drinks/${id}/statistics`;
        const baseRequestOptions: RequestInit = {next: {tags: ['totalStatistics']}}
        return await fetchApi20<IFoodAndDrinkTotalStatistics>(endpoint, baseRequestOptions)
    }

    async findViewStatistics(id: string, query: IFoodAndDrinkViewStatisticsQuery): Promise<IApiResponse<IFoodAndDrinkViewStatistics>> {
        const endpoint = `/food-and-drinks/${id}/views`;
        const baseRequestOptions: RequestInit = {}
        return await fetchApi20<IFoodAndDrinkViewStatistics>(endpoint, baseRequestOptions, {query})
    }

    async findReviewStatistics(id: string): Promise<IApiResponse<IFoodAndDrinReviewStatisticsListData>> {
        const endpoint = `/food-and-drinks/${id}/reviews/statistics`;
        const baseRequestOptions: RequestInit = {}
        return await fetchApi20<IFoodAndDrinReviewStatisticsListData>(endpoint, baseRequestOptions)
    }

    async findReviews(id: string, query?: IReviewQuery): Promise<IApiResponse<IReviewWithCreatorListData>> {
        const endpoint = `/food-and-drinks/${id}/reviews`;
        const baseRequestOptions: RequestInit = {}
        return await fetchApi20<IReviewWithCreatorListData>(endpoint, baseRequestOptions, {query})
    }

    async findComments(id: string, query?: IFoodAndDrinkCommentQuery): Promise<IApiResponse<ICommentWithUserListData>> {
        const endpoint = `/food-and-drinks/${id}/comments`;
        const baseRequestOptions: RequestInit = {}
        return await fetchApi20<ICommentWithUserListData>(endpoint, baseRequestOptions, {query})
    }

    async contact(contactFoodAndDrinkDto: IContactFoodAndDrink, foodAndDrinkId: string): Promise<IApiResponse<ICommentWithFoodAndDrinkListData>>{
        const endpoint = `/food-and-drinks/${foodAndDrinkId}/contact`;
        const baseRequestOptions: RequestInit = {method: 'POST', body: JSON.stringify(contactFoodAndDrinkDto)}
        return await fetchApi20<ICommentWithFoodAndDrinkListData>(endpoint, baseRequestOptions)
    }
}

export const foodAndDrinkService = new FoodAndDrinkService()