import { IFoodAndDrinkQuery } from '@/src/interfaces/shared/IBaseQuery';
import { QueryDirector } from '@/src/lib/query.director';
import {getErrorResponse} from "@/src/errors/get.error.response";
import {fetchApi} from "@/src/lib/fetch.api";
import {IFoodAndDrinkList} from "@/src/interfaces/food-and-drink/IFoodAndDrinkList";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IFoodAndDrink} from "@/src/interfaces/food-and-drink/IFoodAndDrink";

export class FoodAndDrinkService {
    async find(query?: IFoodAndDrinkQuery):Promise<IApiResponse<IFoodAndDrinkList>> {
        try{
            const endpoint = '/food-and-drinks';
            const queryDirector = new QueryDirector(endpoint, query);
            const fullEndpoint = queryDirector.build();
            const foodAndDrinkList = await fetchApi<IFoodAndDrinkList>(fullEndpoint, {cache: 'force-cache', next: {revalidate: 3600}})
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
            const foodAndDrinkList = await fetchApi<string[]>(endpoint)
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
            const foodAndDrinkList = await fetchApi<string[]>(endpoint)
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
            const foodAndDrinkById = await fetchApi<IFoodAndDrink>(endpoint, {cache: 'force-cache', next: {revalidate: 3600}})
            return {success: true, ...foodAndDrinkById}
        }
        catch (e){
            console.log(`Сталась помилка в ${this.find.name}:`, e)
            return getErrorResponse(e)
        }
    }
}

export const foodAndDrinkService = new FoodAndDrinkService()