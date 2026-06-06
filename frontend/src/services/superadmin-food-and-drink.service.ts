import {IFoodAndDrinkQuery} from "@/src/interfaces/shared/IBaseQuery";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IFoodAndDrinkListData} from "@/src/interfaces/food-and-drink/IFoodAndDrinkListData";
import {QueryDirector} from "@/src/lib/query.director";
import {fetchApi} from "@/src/lib/fetch.api";
import {getErrorResponse} from "@/src/errors/get.error.response";
import {FoodAndDrinkStatusEnum} from "@/src/enums/food-and-drink/food-and-drink-status.enum";
import {IFoodAndDrinkOwnerInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOwnerInfo";

export class SuperadminFoodAndDrinkService {
    async find(query?: IFoodAndDrinkQuery, requestInit?: RequestInit):Promise<IApiResponse<IFoodAndDrinkListData>> {
        try{
            const endpoint = '/superadmin/food-and-drinks';
            const queryDirector = new QueryDirector(endpoint, query);
            const fullEndpoint = queryDirector.build();
            const foodAndDrinkList = await fetchApi<IFoodAndDrinkListData>(fullEndpoint, {cache: 'no-store', ...requestInit})
            return {success: true, ...foodAndDrinkList}
        }
        catch (e){
            console.log(`Сталась помилка в ${this.find.name}:`, e)
            return getErrorResponse(e)
        }
    }

    async setStatus(id: string, status: FoodAndDrinkStatusEnum, requestInit?: RequestInit):Promise<IApiResponse> {
        try{
            const endpoint = `/superadmin/food-and-drinks/${id}/status`;
            const foodAndDrinkList = await fetchApi(endpoint, {method: 'POST', body: JSON.stringify({status}), ...requestInit})
            return {success: true, ...foodAndDrinkList}
        }
        catch (e){
            console.log(`Сталась помилка в ${this.find.name}:`, e)
            return getErrorResponse(e)
        }
    }

    async findById(id: string, requestInit?: RequestInit):Promise<IApiResponse<IFoodAndDrinkOwnerInfo>> {
        try{
            const endpoint = `/superadmin/food-and-drinks/${id}`;
            const foodAndDrinkByIdResponse = await fetchApi<IFoodAndDrinkOwnerInfo>(endpoint, {method: 'GET', ...requestInit})
            return {success: true, ...foodAndDrinkByIdResponse}
        }
        catch (e){
            console.log(`Сталась помилка в ${this.find.name}:`, e)
            return getErrorResponse(e)
        }
    }
}

export const superadminFoodAndDrinkService = new SuperadminFoodAndDrinkService()