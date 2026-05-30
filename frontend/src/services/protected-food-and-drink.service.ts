import {IFoodAndDrinkQuery} from "@/src/interfaces/shared/IBaseQuery";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IFoodAndDrinkList} from "@/src/interfaces/food-and-drink/IFoodAndDrinkList";
import {QueryDirector} from "@/src/lib/query.director";
import {fetchApi} from "@/src/lib/fetch.api";
import {getErrorResponse} from "@/src/errors/get.error.response";
import {FoodAndDrinkStatusEnum} from "@/src/enums/food-and-drink/food-and-drink-status.enum";

export class ProtectedFoodAndDrinkService{
    async find(query?: IFoodAndDrinkQuery, requestInit?: RequestInit):Promise<IApiResponse<IFoodAndDrinkList>> {
        try{
            const endpoint = '/superadmin/food-and-drinks';
            const queryDirector = new QueryDirector(endpoint, query);
            const fullEndpoint = queryDirector.build();
            const foodAndDrinkList = await fetchApi<IFoodAndDrinkList>(fullEndpoint, {cache: 'no-store', ...requestInit})
            return {success: true, ...foodAndDrinkList}
        }
        catch (e){
            console.log(`Сталась помилка в ${this.find.name}:`, e)
            return getErrorResponse(e)
        }
    }

    async setStatus(id: string, status: FoodAndDrinkStatusEnum, requestInit?: RequestInit):Promise<IApiResponse<null>> {
        try{
            const endpoint = `/superadmin/food-and-drinks/${id}/status`;
            const foodAndDrinkList = await fetchApi<null>(endpoint, {method: 'POST', body: JSON.stringify({status}), ...requestInit})
            return {success: true, ...foodAndDrinkList}
        }
        catch (e){
            console.log(`Сталась помилка в ${this.find.name}:`, e)
            return getErrorResponse(e)
        }
    }
}

export const protectedFoodAndDrinkService = new ProtectedFoodAndDrinkService()