import { IFoodAndDrinkQuery } from '@/src/interfaces/shared/IBaseQuery';
import { QueryDirector } from '@/src/lib/query.director';
import {getErrorResponse} from "@/src/errors/get.error.response";
import {fetchApi} from "@/src/lib/fetch.api";
import {IFoodAndDrinkListData} from "@/src/interfaces/food-and-drink/IFoodAndDrinkListData";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IFoodAndDrink} from "@/src/interfaces/food-and-drink/IFoodAndDrink";
import {ICreateFoodAndDrinkDto} from "@/src/interfaces/food-and-drink/ICreateFoodAndDrink";
import {IFoodAndDrinkOwnerInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOwnerInfo";

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
            console.log(`Сталась помилка в ${this.find.name}:`, e)
            return getErrorResponse(e)
        }
    }

    async findTypes():Promise<IApiResponse<string[]>> {
        try{
            const endpoint = '/food-and-drinks/types';
            const foodAndDrinkList = await fetchApi<string[]>(endpoint, {cache: 'force-cache'})
            return {success: true, ...foodAndDrinkList}
        }
        catch (e){
            console.log(`Сталась помилка в ${this.find.name}:`, e)
            return getErrorResponse(e)
        }
    }

    async findFeatures():Promise<IApiResponse<string[]>> {
        try{
            const endpoint = '/food-and-drinks/features';
            const foodAndDrinkList = await fetchApi<string[]>(endpoint, {cache: 'force-cache'})
            return {success: true, ...foodAndDrinkList}
        }
        catch (e){
            console.log(`Сталась помилка в ${this.find.name}:`, e)
            return getErrorResponse(e)
        }
    }

    async findById(id: string):Promise<IApiResponse<IFoodAndDrink>> {
        try{
            const endpoint = `/food-and-drinks/${id}`;
            const foodAndDrinkById = await fetchApi<IFoodAndDrink>(endpoint, {next: {revalidate: 15}})
            return {success: true, ...foodAndDrinkById}
        }
        catch (e){
            console.log(`Сталась помилка в ${this.find.name}:`, e)
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
            console.log(`Сталась помилка в ${this.find.name}:`, e)
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
            console.log(`Сталась помилка в ${this.find.name}:`, e)
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
            console.log(`Сталась помилка в ${this.find.name}:`, e)
            return getErrorResponse(e)
        }
    }
}

export const foodAndDrinkService = new FoodAndDrinkService()